export default function AssetsTableAndDonationButton() {
    const assets = [
        {
            id: 1,
            logo: "logo",
            name: "Algorand",
            unit_name: "Algo",
            usd_value: "0.8"
        },
    ]

    return (
        <>
            <div className="container is-flex is-justify-content-space-between is-align-content-end">
                <h3 className="title is-4">Assets Table</h3>
                <button className="button is-warning">Donate 1 Algo</button>
            </div>
            <div className="container mt-5">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <th>Logo + Unit name</th>
                        <th>name</th>
                        <th>USD value ($)</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            assets.map((asset, index) => (
                                <tr key={index} className="">
                                    <td className="is-flex is-justify-content-start is-align-content-center">
                                        <span>{asset.logo}</span>
                                        <span>{asset.unit_name}</span>
                                    </td>
                                    <td>{asset.name}</td>
                                    <td>{asset.usd_value}</td>
                                    <td>
                                        <button className="button is-danger">Opt In</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <td>Logo + Unit name</td>
                        <td>name</td>
                        <td>USD value</td>
                        <td>Action</td>
                    </tfoot>
                </table>
            </div>
        </>
    )
}