// HomeStyles.js
import { Padding } from '@mui/icons-material';
import Bg from '../../asserts/Web3.png'


const styles = {
    container: {
      backgroundImage:`url(${Bg})`,
      backgroundSize: 'cover',
      width:"100%",
      height:"95vh",
      display: "flex",
      flexDirection: "column",
      paddingTop:"100px",
      overflowX:"hidden",
      '@media (max-width:600px)': {
        height:"50vh",
        width:"100%",
        // Padding:'150px',
        backgroundColor:'red',
    },
      
    },
    contentContainer: {
      marginTop:"5%",
     textAlign:'center',
     
    },
//     tt:{
//       fontSize:'30px',
// '@media(max-width:600px)': {
//     //  padding:'40px',
//       backgroundColor:'red',
//       color:'red'
//   },
    // },
    buttonContainer: {
      marginTop:"5%",
    },
    button: {
     
      height: "50px",

    },
    startButton: {
      backgroundColor: "#f3e9dc",
      color: "#5e3023",
     
    },
    premiumButton: {
      backgroundColor: "#5e3023",
      color: "white",
    },
  };
  
  export default styles;
  