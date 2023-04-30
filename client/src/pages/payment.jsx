import {Button} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {API} from "../config/api";
import {UserContext} from "../context/user"
import {BsCheck} from "react-icons/bs"

export default function Payment(){
  const [state] = useContext(UserContext)
    let navigate = useNavigate();

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    const handleBuy = useMutation(async (e) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const data = {
                seller_id: state.user.id,
                price: e.price,
            };

            const body = JSON.stringify(data);
            const response = await API.post("/transaction", body, config);
            console.log("transaction success :", response);

            const token = response.data.data.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log("transaction failed : ", error);
        }
    })
  return(
    <>
        <div className="bg-dark d-flex" style={{ height: "100vh" }}>
            <div className="container bg-danger bg-gradient rounded text-center py-3" style={{ width: "500px", height:"400px" }}>
                <div className="px-5 py-4">
                    <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-4 danger text-light bg-dark px-3 rounded"><span className="text-danger fw-bold">Dumbflix</span> Family</p>
                    <div className="">
                    <p className="fs-3 text-light mb-0">Rp 86,900</p>
                    <p className="danger text-light" style={{ fontSize:"11px" }}>UNTUK 2 BULAN</p>
                    </div>
                    
                    </div>
                   
                    <p className="text-light pt-5" style={{ fontSize: "18px" }}>Hingga 6 akun Premium untuk anggota keluarga yang tinggal serumah. </p>
                </div>
                <Button onClick={() => handleBuy.mutate({ price: 86900 })} type="submit" className="btn-light rounded-5 py-2 px-4">DAPATKAN PREMIUM</Button>
                <div className="text-light pt-3" style={{ fontSize: "12px" }}>
                    <p >Hanya Rp 86,900/bulan sesudahnya. Tawaran hanya tersedia bagi pengguna baru Premium <span className="fw-bold">Persyaratan dan ketentuan berlaku.</span></p>
                </div>
            </div>
            <div className="container bg-success bg-gradient rounded text-center py-3" style={{ width: "500px", height:"400px" }}>
                <div className="px-5 py-4">
                    <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-4 danger text-light bg-dark px-3 rounded"><span className="text-danger fw-bold">Dumbflix</span> Individu</p>
                    <div className="">
                    <p className="fs-3 text-light mb-0">Rp 54,990</p>
                    <p className="danger text-light" style={{ fontSize:"11px" }}>UNTUK 3 BULAN</p>
                    </div>
                    
                    </div>
                   
                    <p className="text-light pt-5" style={{ fontSize: "18px" }}>Hingga 6 akun Premium untuk anggota keluarga yang tinggal serumah.</p>
                </div>
                <Button onClick={() => handleBuy.mutate({ price: 54990 })} type="submit" className="btn-light rounded-5 py-2 px-4">DAPATKAN PREMIUM</Button>
                <div className="text-light pt-3" style={{ fontSize: "12px" }}>
                    <p >Hanya Rp 54,990/3 bulan sesudahnya. Tawaran hanya tersedia bagi pengguna baru Premium <span className="fw-bold">Persyaratan dan ketentuan berlaku.</span></p>
                </div>
            </div>
        </div>
    </>
    
        
    //     </form>
    //   </div>   
    // </div>
    // </div>
  )
}