import { BetaAnalyticsDataClient } from '@google-analytics/data'
import path from 'path'

const propertyId = process.env.GA4_PROPERTY_ID

// Initialize client with credentials
// We expect the service account JSON key to be at src/service-account.json
const keyFilename = path.resolve(process.cwd(), 'src', 'service-account.json')

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename,
})

export async function getAnalyticsData(startDate: string = '7daysAgo', endDate: string = 'today') {
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined in .env')
  }

  try {
    const [
      activeUsersRun,
      userTrendsRun,
      countryRun,
      newUsersRun,
      generalStatsRun,
      trafficSourcesRun,
      topPagesRun,
      deviceCategoryRun,
    ] = await Promise.all([
      // 1. Realtime Active Users
      analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }],
      }),

      // 2. User Trends
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }],
        orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } }],
      }),

      // 3. Top Countries
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 5,
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      }),

      // 4. Total New Users
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'newUsers' }],
      }),

      // 5. General Stats
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
          { name: 'totalUsers' },
          { name: 'activeUsers' },
        ],
      }),

      // 6. Traffic Sources
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'activeUsers' }],
        limit: 5,
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      }),

      // 7. Top Pages
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        limit: 5,
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      }),

      // 8. Device Category
      analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      }),
    ])

    // Process Active Users (Deprecated Realtime fetch, now using period stats)
    // const activeUsers = activeUsersRun[0]?.rows?.[0]?.metricValues?.[0]?.value || '0'

    // Process Trends
    const trends =
      userTrendsRun[0]?.rows?.map((row) => {
        const d = row.dimensionValues?.[0]?.value || ''
        return {
          date: d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : '', // YYYY-MM-DD
          activeUsers: parseInt(row.metricValues?.[0]?.value || '0'),
          newUsers: parseInt(row.metricValues?.[1]?.value || '0'),
        }
      }) || []

    // Process Countries
    const countries =
      countryRun[0]?.rows?.map((row) => ({
        country: row.dimensionValues?.[0]?.value || 'Unknown',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []

    // Process New Users
    const newUsers = newUsersRun[0]?.rows?.[0]?.metricValues?.[0]?.value || '0'

    // Process General Stats
    const statsRow = generalStatsRun[0]?.rows?.[0]?.metricValues
    const sessions = statsRow?.[0]?.value || '0'
    const pageViews = statsRow?.[1]?.value || '0'
    const engagementRate = (parseFloat(statsRow?.[2]?.value || '0') * 100).toFixed(2)
    const bounceRate = (parseFloat(statsRow?.[3]?.value || '0') * 100).toFixed(2)
    const avgSessionDuration = parseFloat(statsRow?.[4]?.value || '0').toFixed(0)
    const totalUsers = parseInt(statsRow?.[5]?.value || '0')
    // Override Realtime Active Users with Period Active Users
    const activeUsers = statsRow?.[6]?.value || '0'

    // Process Traffic Sources
    const sources =
      trafficSourcesRun[0]?.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value || 'Unknown',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []

    // Process Top Pages
    const pages =
      topPagesRun[0]?.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || 'Unknown',
        views: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []

    // Process Device Category
    const devices =
      deviceCategoryRun[0]?.rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value || 'Unknown',
        users: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []

    return {
      activeUsers,
      newUsers,
      sessions,
      pageViews,
      engagementRate,
      bounceRate,
      avgSessionDuration,
      totalUsers,
      trends,
      countries,
      sources,
      pages,
      devices,
    }
  } catch (error) {
    console.error('Error fetching GA4 data:', error)
    return {
      activeUsers: 0,
      newUsers: 0,
      sessions: 0,
      pageViews: 0,
      engagementRate: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
      totalUsers: 0,
      trends: [],
      countries: [],
      sources: [],
      pages: [],
      devices: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
