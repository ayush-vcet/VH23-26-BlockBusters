import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 

function Verify({state}) {
  const [img, setImg] = useState('');
  const { contract } = state;
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    if (!contract || !userId) {
      return; // Here we Exit as if the contract or userId is not available
    }

    async function getDetail() {
      try {
        const nameText = await contract.methods.Certificate_Detail_Mapping(userId).call();
        console.log(nameText);
        console.log(userId);
        setImg(nameText.img); // Assuming 'img' is the property you want to retrieve
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getDetail();
  }, [contract, userId]);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: '#111827'
      };
      
      const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
        /* Add any additional styling you need for your image */
      };
    return(
        <>
        <div style={containerStyle}>
      <img
        src={`https://ipfs.io/ipfs/${img}`}
        alt="Your Image"
        style={imageStyle}
      />
    </div>
        </>
    );
}
export default Verify;