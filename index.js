const express = require("express");
const res = require("express/lib/response");
const appp = express();
appp.use(express.json());


// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAGiXjXjETffo8LkFxk6rbtdDVcYwJhP4A",
    authDomain: "ptitworks-51075.firebaseapp.com",
    projectId: "ptitworks-51075",
    storageBucket: "ptitworks-51075.appspot.com",
    messagingSenderId: "523435858478",
    appId: "1:523435858478:web:9d7910b7424ca1279fddbf"
  };

const port = process.env.PORT || 3000;
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


appp.post("/login", async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    const docRef = doc(db, "user", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        if(docSnap.data().password == password){
            //res.send({ msg : "Dang nhap thanh cong"});
            res.json({msg : {message : "Dang nhap thanh cong"}, user: docSnap.data()});
            //console.log(docSnap.data(username));
        }else{
            res.json({ msg : {message: "Mat khau khong chinh xac"} })
        }
        //console.log("Document data:", docSnap.data().password);
      } else {
        //res.send({ msg : "Sai ten dang nhap"})
        
      }

});

appp.post("/resgister", async (req, res, next) =>{
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var avt = req.body.avt;
    var email = req.body.email;

    const docR = doc(db, "user", username);
    const check = await getDoc(docR);
   
    if(check.data(username) != null){
        //res.send({msg: "User nay da ton tai"});
        //console.log("User nay da ton tai");
        //res.send({msg: "User nay da ton tai"});
        res.json({ msg : {message: "User nay da ton tai"} });
    }else{
        dky = setDoc(doc(db, "user", username), {
                                password: password,
                                name: name,
                                avt: avt,
                                email: email
                            });
        //res.send({msg: "Tao tai khoan thanh cong"});
        res.json({ msg : {message:"Tao tai khoan thanh cong"} })
    }
});

appp.get("/data", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });

appp.post("/update/profile", async (req, res) => {
    const username = req.body.username;
    const avt = req.body.avt;
    const email = req.body.email;
    name = req.body.name;
    const dlt =  updateDoc(doc(db, "user", username), {
        avt: avt,
        email: email,
        name: name,
    });
    //username.doc(id).delete();
    //res.send({ msg: "Doi avt thanh conng"});
    res.json({ msg : {message:"Sua thong tin thanh cong"} })
});

appp.post("/update/password", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const dlt =  updateDoc(doc(db, "user", username), {
        password: password,
    });
    //username.doc(id).delete();
    //res.send({ msg: "Doi avt thanh conng"});
    res.json({ msg : {message:"Doi mat khau thanh cong"} })
});

appp.post("/delete", async (req, res) => {
    const id = req.body.id;
    //const username = deleteDoc(collection(db, "user"));
    const dlt =  deleteDoc(doc(db, "user", id), {
        //id: id,
    });
    //username.doc(id).delete();
    res.json({ msg : {message:"Xoa thanh cong"} })
});

appp.listen(port, function () {
    console.log("Up & RUnning *4000");
});