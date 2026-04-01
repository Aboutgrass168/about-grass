// A simple script to test the redirects revalidation
// Run with: node src/Header/test-revalidation.js

const testRevalidation = async () => {
  try {
    // Replace with your actual website URL if different
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/revalidate?tag=redirects`)
    const result = await response.json()

    console.log('Revalidation result:', result)
    console.log('Redirects should now be revalidated in the Next.js cache.')
  } catch (error) {
    console.error('Error revalidating redirects:', error)
  }
}

testRevalidation()
