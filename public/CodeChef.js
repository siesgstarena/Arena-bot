const axios = require("axios");
const date = require("date-and-time");
require("dotenv").config();
class Codechef {
    static token = null;
    static expires = null;
    static async makeToken() {
        var TOKEN_URL = "https://api.codechef.com/oauth/token";
        console.log("Making token 1");
        console.log("Token is ", this.token)
        var dat_token = {
            "grant_type": "client_credentials",
            "scope": "public",
            "client_id": process.env.CODECHEF_CLIENT_ID,
            "client_secret": process.env.CODECHEF_CLIENT_SECRET,
        };
        var params = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        };
        var curr_time = new Date();
        if (this.token == null || curr_time >= this.expires) {
            try{

                const res = await axios.post(TOKEN_URL, dat_token, params);
                this.token = await res.data.result.data.access_token;
                const expire_in = await res.data.result.data.expires_in;
                this.expires = date.addSeconds(curr_time, expire_in);
            }
            catch(err){
                console.log(err);
            }
        }
        return this.token;
    }
}

module.exports = Codechef;