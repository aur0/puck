import { ColorPicker } from '@/components/theme';

export default function ThemePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Theme Customization
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg">
            Customize your theme colors and preview them instantly
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              <ColorPicker />
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Preview
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary"></div>
                    <span className="ml-4 text-gray-600">Primary Color</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
