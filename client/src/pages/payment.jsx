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
    // let { id } = useParams();

    // let { data: product } = useQuery("productDetailCache", async () => {
    //   const response = await API.get("/product/" + id);
    //   return response.data.data;
    // });


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
              price: 2000000,
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
    // <div className="d-flex align-items-center justify-content-center" style={{ background: "black", height: "100vh" }}>
    // <div>
    // <h1 className="text-white text-center fw-semibold fs-1 mb-4">Premium</h1>
    //   <div>
    //     <p  className="text-white">Bayar sekarang dan nikmati streaming film-film yang kekinian dari <span className="text-danger fw-bold">DUMBFLIX</span></p>
    //     <p className="fw-bold text-center"><span className="text-danger fw-bold">DUMBFLIX</span> : 0981312323</p>
    //     <form className="d-flex flex-column align-items-center justify-content-center ">
    //       <Form.Group className="mb-3 d-flex " style={{width:"300px"}}>
    //           <Form.Control
    //             type="email"
    //             placeholder="Input Your Account Number"
    //             className="bg-dark text-white"
    //           />
    //       </Form.Group >
    //       <Form.Group className="mb-3" style={{width:"300px"}}>
    //         <Form.Control
    //           type="file"
    //           placeholder="Input Your Account Number"
    //           className="bg-light text-white"/>
    //       </Form.Group>
    <>
        <div className="bg-dark" style={{ height: "100vh" }}>
            <div className="container border border-danger text-center py-3" style={{ width: "500px" }}>
                <div className="">
                    <p className="fs-1 danger text-light"><span className="text-danger fw-bold">Dumbflix</span> Premium</p>
                    <p className="fs-4 text-light ">Dapatkan 1 tahun Premium cuma Rp 2 jt</p>
                </div>
                <Button onClick={(e) => handleBuy.mutate(e)} type="submit" className="btn-danger rounded-5 px-5">DAPATKAN PREMIUM</Button>
                <div className="text-light pt-3" style={{ fontSize: "10px" }}>
                    <p >Hanya Rp 2 jt/bulan. <span className="fw-bold">Persyaratan dan ketentuan berlaku.</span> Tawaran tidak tersedia untuk pengguna yang pernah mencoba Premium. Tawaran berakhir 16 Mei 2023</p>
                </div>
                <div class="card bg-dark text-start border-light" style={{ fontSize: "14px" }}>
                    <div class="card-header text-light">
                        Mengapa bergabung ke Premium?
                    </div>
                    <ul class="list-group ">
                        <li class="list-group-item bg-dark text-light"><BsCheck/> Tonton film secara offline tanpa Wi-Fi atau data seluler</li>
                        <li class="list-group-item bg-dark text-light"><BsCheck/> Tonton film bebas iklan</li>
                        <li class="list-group-item bg-dark text-light"><BsCheck/> kualitas gambar lebih tinggi</li>
                    </ul>
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