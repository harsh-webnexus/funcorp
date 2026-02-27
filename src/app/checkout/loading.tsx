// src/app/checkout/loading.tsx
export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Contact Section Skeleton */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Shipping Section Skeleton */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Payment Section Skeleton */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}