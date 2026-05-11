const CounselingHistory = ({ counselings }) => {
    // Just take the first 3 since the backend already sent them sorted
    const latestCounselings = counselings ?  counselings?.slice(0, 3) : [];

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header bg-success text-white">
                <h6 className="mb-0">Recent Counseling History</h6>
            </div>
            <div className="card-body p-0 pb-2">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {latestCounselings.length > 0 ? (
                        latestCounselings.map((c) => (
                            <tr key={c.id}>
                                {/* Ensure this matches your Counseling entity field name */}
                                <td>{c.counseling_date }</td>
                                <td>{c.type}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center text-muted py-3">
                                No history found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default CounselingHistory;