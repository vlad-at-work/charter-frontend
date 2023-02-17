
import './card.css';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
export default function BasicCard({ monthData }) {
  return (
    <div className='card'>
      <Typography color="#FFFFFF" mt={2}  variant="h5">{monthNames[monthData.month]}</Typography>
      <div className='table'>
        <div className='row' key={monthData.month}>
          <Typography variant="subtitle1" color="#FFFFFF"  fontSize="15px">{"Date"}</Typography>
          <Typography variant="subtitle1" color="#FFFFFF"  fontSize="15px">Purchase</Typography>
          <Typography variant="subtitle1" color="#FFFFFF"  fontSize="15px" textAlign="left">Points</Typography>
        </div>
        {
          Object.values(monthData.transaction).map((item, index) => {
            let dString = String(new Date(item.time))
            let dt = dString.substring(8, 16)
            return (
              <div className='row' key={item.time}>
                <Typography variant="caption2" fontSize="12px" color="#FFFFFF" textAlign="left">{dt}</Typography>
                <Typography variant="caption2" fontSize="12px" color="#FFFFFF"  textAlign="left" >{item.price}</Typography>
                <Typography variant="caption2" fontSize="12px" color="#FFFFFF"  textAlign="left">{item.points}</Typography>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];