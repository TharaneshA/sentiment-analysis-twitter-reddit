import { useState } from 'react';
import axios from 'axios';

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/analyze/tweets', {
                query,
                max_results: 100
            });

            // Process sentiment data
            const tweets = response.data.tweets;
            const sentimentData = {
                positive: tweets.filter(t => t.sentiment_label === 'POSITIVE').length,
                negative: tweets.filter(t => t.sentiment_label === 'NEGATIVE').length,
                tweets: tweets
            };

            setResults(sentimentData);
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred while analyzing tweets');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter search query (e.g., #AI, @username)"
                        className="flex-1 p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}

            {results && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-100 rounded">
                            <h3 className="text-lg font-semibold">Positive Tweets</h3>
                            <p className="text-2xl">{results.positive}</p>
                        </div>
                        <div className="p-4 bg-red-100 rounded">
                            <h3 className="text-lg font-semibold">Negative Tweets</h3>
                            <p className="text-2xl">{results.negative}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Analyzed Tweets</h3>
                        {results.tweets.map((tweet) => (
                            <div
                                key={tweet.id}
                                className={`p-4 rounded border ${
                                    tweet.sentiment_label === 'POSITIVE'
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-red-200 bg-red-50'
                                }`}
                            >
                                <p className="mb-2">{tweet.text}</p>
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold">
                                        Sentiment Score: {(tweet.sentiment_score * 100).toFixed(1)}%
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(tweet.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchForm;