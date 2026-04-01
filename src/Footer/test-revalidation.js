// A simple script to test the footer revalidation
// Run with: node src/Footer/test-revalidation.js

const testRevalidation = async () => {
  try {
    // Replace with your actual website URL if different
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/revalidate?tag=global_footer`)
    const result = await response.json()

    console.log('Revalidation result:', result)
    console.log('Footer should now be revalidated in the Next.js cache.')
  } catch (error) {
    console.error('Error revalidating footer:', error)
  }
}

testRevalidation()
