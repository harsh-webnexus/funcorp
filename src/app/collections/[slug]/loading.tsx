export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-64 bg-gray-200 animate-pulse"></div>
      <div className="container-custom py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block lg:w-80">
            <div className="bg-white p-6 rounded-lg">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              {[1,2,3,4].map(i => (
                <div key={i} className="mb-4">
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-white p-4 rounded-lg">
                  <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}