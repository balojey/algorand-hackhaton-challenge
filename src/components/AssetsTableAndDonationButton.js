import React, { useEffect, useState } from "react";
import { usePeraChallengeContext } from "../context/PeraChallengeContext";

export default function AssetsTableAndDonationButton() {
    const { isConnectedToPeraWallet, donateAlgo, assets, optInAsset } = usePeraChallengeContext();

    return (
        <>
            <div className="container is-flex is-justify-content-space-between is-align-content-end">
                <h3 className="title is-4">Assets Table</h3>
                <button className="button is-warning" onClick={donateAlgo}>Donate 1 Algo</button>
            </div>
            <div className="container mt-5">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Logo + Unit name</th>
                            <th>Name</th>
                            <th>USD value ($)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.length > 0 ? (
                            assets.map((asset, index) => (
                                <tr key={index}>
                                    <td className="is-flex is-justify-content-start is-align-content-center">
                                        <img src={asset.logo} width="50" height="10"/>
                                        <span> {asset.unit_name}</span>
                                    </td>
                                    <td>{asset.name}</td>
                                    <td>{asset.usd_value}</td>
                                    <td>
                                        {isConnectedToPeraWallet 
                                        ? <button className="button is-danger" onClick={() => optInAsset(asset.asset_id)}>Opt In</button>
                                        : <button className="button" disabled>Opt In</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="has-text-centered">Loading assets...</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Logo + Unit name</td>
                            <td>Name</td>
                            <td>USD value</td>
                            <td>Action</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}
