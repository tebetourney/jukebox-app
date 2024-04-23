const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "8b5fded4ec2c43c5a87f0414f632fa35";
const redirectUri = "http://localhost:3001";
const scopes = ["user-library-read","playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join( 
    "%20"
)}&response_type=token&show_dialog=true`;