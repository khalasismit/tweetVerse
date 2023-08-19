import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const Profile = ({ firstName, lastName, location, bio }) => {    
    const isNonMobile = useMediaQuery("(min-width:600px)")
    return <Box width={isNonMobile ? "auto" : "80%"} sx={{ m: "1rem 0", p: "1rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "0px 0px 10px 0px black", borderRadius: "1rem" }}>
        {/* First row */}
        <Box sx={{ display: "flex", gap: "2.5rem", m: "0.2rem 0" }}>
            <Box>
                <Avatar sx={{ p: "2rem" }}></Avatar>
            </Box>
            <Box>
                <Typography sx={{ fontFamily: "monospace", fontSize: "1.5rem" }}>{firstName} {lastName}</Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: "1rem" }}>{location}</Typography>
            </Box>
        </Box>
        <Divider orientation="horizontal" sx={{ m: "1rem 0rem", width: "100%"}} />
        {/* Second row */}
        <Box>
            <Typography p="0.5rem 0">{bio}</Typography>
        </Box>
        <Divider orientation="horizontal" sx={{ m: "1rem 0rem", width: "100%", }} />
        <Button sx={{ color: "black", bgcolor: "lightgrey", width: "100%", ":hover": { bgcolor: "darkgray" } }}><Typography sx={{ fontFamily: "monospace", textTransform: "initial" }}>
            Edit Profile</Typography></Button>
    </Box>
}
export default Profile;