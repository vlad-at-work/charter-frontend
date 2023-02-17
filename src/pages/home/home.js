import axios from 'axios'
import { useEffect, useState } from 'react'
import './home.css'
import { Avatar, Typography, Card, Button } from "@mui/material";
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import profileImage from "../../assets/avatar.jpeg"
import BasicCard from '../components/card/card';
import { monthNames } from '../components/card/card';


export default function Home() {
    const [data, setData] = useState(true);
    const [user, setUser] = useState({
        name: "User Name", id: "user1",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get("http://localhost:8080/transaction").then(res => {
            lastThreeMonths(res.data, user.id).then(res => {
                setData(res);
                setLoading(false)
            })
        }).catch(err => {
            console.log(err)
        })
    }, []);

    if (loading) {
        return (
            <div className='home'>

            </div>
        )
    }
    return (
        <div className='home'>
            <div className='side-bar'>
                <Button variant="text" color="primary">
                    <PaidTwoToneIcon color="primary" fontSize='large' />
                </Button>
                <div className='side-bar-icon'>
                    <Button variant="text" color="primary">
                        <DashboardCustomizeTwoToneIcon color="primary" fontSize='large' />
                    </Button>
                    <Button variant="text" color="primary">
                        <ReceiptTwoToneIcon color="primary" fontSize='large' />
                    </Button>
                    <Button variant="text" color="primary">
                        <AccountBoxTwoToneIcon color="primary" fontSize='large' />
                    </Button>

                </div>
                <Button variant="text" color="primary">
                    <ExitToAppTwoToneIcon color="error" fontSize='large' />
                </Button>

            </div>
            <div className='container'>
                <div className='top'>
                    <div className='user'>
                        <Avatar alt={user.name} src={profileImage} sx={{ width: 100, height: 100 }} />
                        <Typography variant="h5" mt={4} color={"#FFFFFF"}>{user.name}</Typography>
                    </div>
                    <div className='all-points'>
                        {
                            data[2].points >= data[1].points ?
                                <ArrowCircleUpTwoToneIcon color="primary" fontSize='small' /> :
                                <ArrowCircleDownTwoToneIcon color="error" fontSize='small' />
                        }
                        <Typography variant="h3" mt={2} color={"#FFFFFF"}>{data[0].points + data[1].points + data[2].points}</Typography>
                    </div>
                    <div id='top-text-container'>
                        <Typography variant="h6" color={"#FFFFFF"}>Your total points for last three months</Typography>
                    </div>
                    <div className='monthly-points'>
                        <div className='m-point'>
                            <Typography variant="h5" color={"#FFFFFF"}>{data[2].points}</Typography>
                            <Typography variant="h5" color={"#FFFFFF"}>{monthNames[data[2].month]}</Typography>
                        </div>
                        <div className='m-point'>
                            <Typography variant="h5" color={"#FFFFFF"}>{data[1].points}</Typography>
                            <Typography variant="h5" color={"#FFFFFF"}>{monthNames[data[1].month]}</Typography>
                        </div>
                        <div className='m-point'>
                            <Typography variant="h5" color={"#FFFFFF"}>{data[0].points}</Typography>
                            <Typography variant="h5" color={"#FFFFFF"}>{monthNames[data[0].month]}</Typography>
                        </div>
                    </div>
                </div>
                <div className='body'>
                    <BasicCard monthData={data[0]} />
                    <BasicCard monthData={data[1]} />
                    <BasicCard monthData={data[2]} />
                </div>
            </div>
        </div>
    );
}

//get last three month points
async function lastThreeMonths(data, user) {

    const date = new Date();
    const thisMonth = date.getUTCMonth();
    let previousMonth;
    let lastPreviousMonth;
    if (thisMonth == 0) {
        previousMonth = 11;
        lastPreviousMonth = 10
    } else if (thisMonth == 1) {
        previousMonth = 0;
        lastPreviousMonth = 11
    } else {
        previousMonth = thisMonth - 1;
        lastPreviousMonth = thisMonth - 2
    }
    let thisMonthPoints = 0;
    let previousMonthPoints = 0;
    let lastPreviousMonthPoints = 0;
    let thisMonthtrasncation = []
    let previousMonthTransaction = [];
    let lastPreviousMonthTrasnaction = [];
    data.map((item, index) => {
        if (item.user == user) {
            let date = new Date(item.dateTime);
            let month = date.getUTCMonth();
            if (month == thisMonth) {
                let object = new Object();
                object["time"] = item.dateTime;
                object["price"] = item.price;
                object["points"] = getPoints(item.price)
                thisMonthtrasncation.push(object)
                thisMonthPoints = thisMonthPoints + getPoints(item.price);

            } else if (month == previousMonth) {
                let object = new Object();
                object["time"] = item.dateTime;
                object["price"] = item.price;
                object["points"] = getPoints(item.price)
                previousMonthTransaction.push(object)
                previousMonthPoints = previousMonthPoints + getPoints(item.price)
            } else if (month == lastPreviousMonth) {
                let object = new Object();
                object["time"] = item.dateTime;
                object["price"] = item.price;
                object["points"] = getPoints(item.price)
                lastPreviousMonthTrasnaction.push(object)
                lastPreviousMonthPoints = lastPreviousMonthPoints + getPoints(item.price)
            }
        }
    })
    return [{ month: thisMonth, points: thisMonthPoints, transaction: thisMonthtrasncation },
    { month: previousMonth, points: previousMonthPoints, transaction: previousMonthTransaction },
    { month: lastPreviousMonth, points: lastPreviousMonthPoints, transaction: lastPreviousMonthTrasnaction }]
}
//get points for each transaction
function getPoints(amount) {
    if (amount <= 49) {
        return 0
    } else if (amount > 49 && amount <= 100) {
        return (amount - 50)
    } else if (amount > 100) {
        return (((amount - 100) * 2) + 50)
    }
}