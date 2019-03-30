import React, { Component } from 'react';

import {
    Table
} from "react-bootstrap"


import "../css/Campaign.css";
import CampaignData from "../data/CampaignData";
import EditCampain from "../components/EditCampain";

class AllCampaigns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalCampaignData: CampaignData,
            modifiedCampaignData: CampaignData,
            numRowsPerPage: 10,
            numPages: CampaignData.length/10,
            activePage: 1,
            dataToDisplay: CampaignData.slice(0, 10),
            selectedCampaigns: [] 
        }
        this.onType = this.onType.bind(this);
        this.onPaginationButtonClick = this.onPaginationButtonClick.bind(this)
    }

    componentDidMount() {
        this.setState({
            compaignData: CampaignData,
            modifiedCampaignData: CampaignData
        });
    }

    onType = (event) => {
        const typedText = event.target.value;
        this.setState({typedText: typedText})
    }

    onSearchButtonClick = (event) => {
        if(this.state.typedText === "" || !this.state.typedText) {
            this.setState({modifiedCampaignData: this.state.originalCampaignData, dataToDisplay: this.state.originalCampaignData.slice(0, 10)})
        } else {
            const filteredData = this.state.originalCampaignData.filter((campaign) => campaign.name.includes(this.state.typedText))
            this.setState({modifiedCampaignData: filteredData, dataToDisplay: filteredData.slice(0, 10)});
        }
    }

    onPaginationButtonClick = (event) => {
        const btnNum = event.target.value;
        this.setState({activePage: Number(btnNum), dataToDisplay: this.state.modifiedCampaignData.slice((Number(btnNum)-1)*10, ((Number(btnNum)-1)*10)+10)})
    }

    onDeleteClick = (event, campaignToDelete) => {
        const originalIndex = this.state.originalCampaignData.findIndex((campaign) => campaign._id === campaignToDelete._id);
        const modifiedIndex = this.state.modifiedCampaignData.findIndex((campaign) => campaign._id === campaignToDelete._id);
        const originalCampaignData = [...this.state.originalCampaignData.slice(0, originalIndex), ...this.state.originalCampaignData.slice(originalIndex+1, this.state.originalCampaignData.length)];
        const modifiedCampaignData = [...this.state.modifiedCampaignData.slice(0, modifiedIndex), ...this.state.modifiedCampaignData.slice(modifiedIndex+1, this.state.modifiedCampaignData.length)];
        this.setState({
            originalCampaignData: originalCampaignData,
            modifiedCampaignData: modifiedCampaignData,
            dataToDisplay: modifiedCampaignData.slice(0, 10)
        })
    }

    handleCheckboxChange = (event) => {
        this.setState({ checked: event.target.checked })
    }

    onEditClick = (event, campaign) => {
        this.setState({showEditModal: true, editCampaign: campaign})
    }

    closeEditModal = () => {
        this.setState({showEditModal: false, editCampaign: null})
    }

    saveModalChanges = (value) => {
        const originalIndex = this.state.originalCampaignData.findIndex((campaign) => campaign._id === this.state.editCampaign._id);
        const modifiedIndex = this.state.modifiedCampaignData.findIndex((campaign) => campaign._id === this.state.editCampaign._id);
        const campaign = this.state.originalCampaignData[originalIndex];
        campaign.name = value;
        const originalCampaignData = [...this.state.originalCampaignData.slice(0, originalIndex), campaign , ...this.state.originalCampaignData.slice(originalIndex+1, this.state.originalCampaignData.length)];
        const modifiedCampaignData = [...this.state.modifiedCampaignData.slice(0, modifiedIndex), campaign ,...this.state.modifiedCampaignData.slice(modifiedIndex+1, this.state.modifiedCampaignData.length)];
        this.setState({
            originalCampaignData: originalCampaignData,
            modifiedCampaignData: modifiedCampaignData,
            dataToDisplay: modifiedCampaignData.slice(0, 10),
            showEditModal: false,
            editCampaign: null
        })
    }

    render() {
        const that = this;
        return (
        <div style={{marginTop: "50px"}}>
            <div>
                <input name="searchCampaign" placeholder="Type campaign name..." style={{width: "500px"}} onChange={(e) => this.onType(e)}/>
                <button className="btn btn-primary" onClick={(e) => this.onSearchButtonClick(e)}>Search</button>
            </div>
            <Table className="table table-striped striped bordered condensed hover" style={{marginTop: "50px"}}>
            <thead>
                <tr>
                    <th/>
                    <th>Campaign Name</th>
                    <th>Type</th>
                    <th>Company</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.dataToDisplay.map((campaign, index) => {
                        return (
                            <tr key={campaign._id}>
                                <td><input type="checkbox" onChange={(e) => this.handleCheckboxChange(e, campaign)}/></td>
                                <td>{campaign.name}</td>
                                <td>{campaign.type}</td>
                                <td>{campaign.company}</td>
                                <td>
                                    <span style={{cursor: "pointer", color: "blue"}} onClick={(e) => this.onEditClick(e, campaign)}>Edit</span>
                                    <span>          </span>
                                    <span style={{cursor: "pointer", color: "red"}} onClick={(e) => this.onDeleteClick(e, campaign)}>Delete</span>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div>
                {
                    // this.state.modifiedCampaignData.length/this.state.numRowsPerPage
                    new Array((Math.ceil(this.state.modifiedCampaignData.length/10))).fill("").map((el, index) => {
                        return(
                            <button key={index} onClick={(e) => that.onPaginationButtonClick(e)} value={index+1}
                                className={`btn ${that.state.activePage === index+1 ? "btn-primary" : null}`}
                            >{index+1}</button>
                        )
                    })
                }
            </div>
            {
                this.state.showEditModal ? 
                    <EditCampain handleClose={this.closeEditModal} saveModalChanges={this.saveModalChanges} campaign={this.state.editCampaign}/>
                : null
            }
        </div>
        );
    }
}

export default AllCampaigns;
