import { useState } from 'react';
import axios from 'axios';

const TestRegistration = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult(null);

    const testData = {
      firstName: 'TestUser',
      lastName: 'Demo',
      email: `test${Date.now()}@afamia.com`,
      password: 'Test1234',
      phone: '+971501234567'
    };

    console.log('Sending registration data:', testData);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register',
        testData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Success response:', response.data);
      setResult({
        success: true,
        status: response.status,
        data: response.data
      });
    } catch (error: any) {
      console.error('Error response:', error.response?.data);
      setResult({
        success: false,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Registration Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Data:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`{
  firstName: "TestUser",
  lastName: "Demo",
  email: "test[timestamp]@afamia.com",
  password: "Test1234",
  phone: "+971501234567"
}`}
          </pre>
        </div>

        <button
          onClick={testRegistration}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Registration'}
        </button>

        {result && (
          <div className={`mt-6 p-6 rounded-lg ${result.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
            <h3 className="text-xl font-bold mb-4">
              {result.success ? '✅ Success!' : '❌ Error!'}
            </h3>
            
            <div className="space-y-2 mb-4">
              <p className="font-semibold">Status Code: <span className="text-lg">{result.status}</span></p>
            </div>

            <h4 className="font-semibold mb-2">Response:</h4>
            <pre className="bg-white p-4 rounded border overflow-x-auto text-sm">
              {JSON.stringify(result.data, null, 2)}
            </pre>

            {result.success && result.data?.data?.user && (
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold mb-2">User Created:</h4>
                <p>Email: {result.data.data.user.email}</p>
                <p>Name: {result.data.data.user.firstName} {result.data.data.user.lastName}</p>
                <p>Token: {result.data.data.token ? '✅ Received' : '❌ Missing'}</p>
              </div>
            )}

            {!result.success && result.data?.errors && (
              <div className="mt-4 p-4 bg-white rounded border">
                <h4 className="font-semibold mb-2 text-red-600">Validation Errors:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.data.errors.map((err: any, idx: number) => (
                    <li key={idx} className="text-red-600">
                      <strong>{err.field}:</strong> {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-semibold mb-2">📝 Instructions:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Test Registration" button</li>
            <li>Check console (F12) for detailed logs</li>
            <li>Review the response below</li>
            <li>If successful, user is created in database</li>
            <li>If error, see validation messages</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestRegistration;
