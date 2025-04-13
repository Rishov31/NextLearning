import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor", "student"], //ei dutor modhye jokono akta ele tobe valid hobe
        default:'student'
    },
    enrolledCourses:[   // here we take array bcz ami multiple course e enroll korte pari..jokhon multiple data 
        {                                    //ke store korte hobe tokhon array use korte hobe
            type:mongoose.Schema.Types.ObjectId, //we generate a relation with Course and user model so that user janbe je ami kon kon course buy korechi
            ref:'Course'  //Course model er sathe relation baniyechi
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
},{timestamps:true});  //timestamps true dile user register korle time jana jabe je kokhon create korche and update koreche

export const User = mongoose.model("User", userSchema);
