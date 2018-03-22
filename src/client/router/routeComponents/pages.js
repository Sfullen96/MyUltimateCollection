import * as common from "../../components/common";
import * as music from "../../components/views/music";
import * as authentication from "../../components/views/authentication";

export const Pages = ( {
    Home: common.Home,
	Music: music.MusicPage,
    AddNewMusicPage: music.AddNewMusicPage,
    IndividualMusic: music.IndividualMusic,
    IndividualArtist: music.IndividualArtist,
    Login: authentication.Login,
	NotFound: common.NotFound,
} );
