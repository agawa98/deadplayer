
window.onbeforeunload = function() {
    return 'czy na pewno chcesz zamknac odtwarzacz?';
};


let dzien, miesiac, rok, typeFilter, sortBy, currentShowID, showID, direction, newArray, date
let loadingToggle = false

let songArray = [[],[],[]]  // 0 - ID,   1 - title,   2 - length

let currentShowArray

let queueArray = [[],[],[],[]]   // 0 - ShowSongID,  1 - title,  2 - length,  3 - queueID,  4 - element

let showArray = [["01-11-1965","Grateful Dead Live at various on 1965-11-01"],["03-11-1965","Grateful Dead Live at Golden State Studios on 1965-11-03"],["08-01-1966","Grateful Dead Live at Fillmore Auditorium on 1966-01-08"],["29-01-1966","Grateful Dead Live at 363 6th Street on 1966-01-29"],["05-02-1966","Grateful Dead Live at The Questing Beast on 1966-02-05"],["12-02-1966","Grateful Dead Live at Youth Opportunities Center on 1966-02-12"],["25-02-1966","Grateful Dead Live at Ivar Theater on 1966-02-25"],["09-03-1966","Grateful Dead Live at unknown on 1966-03-09"],["10-03-1966","Grateful Dead Live at Unknown on 1966-03-10"],["12-03-1966","Grateful Dead Live at Danish Center on 1966-03-12"],["19-03-1966","Grateful Dead Live at Carthay Studios on 1966-03-19"],["25-03-1966","Grateful Dead Live at Trouper's Hall on 1966-03-25"],["19-05-1966","Grateful Dead Live at Avalon Ballroom on 1966-05-19"],["01-06-1966","Grateful Dead Live at Scorpio Studio Outtakes on 1966-06-01"],["01-07-1966","Grateful Dead Live at Unknown (perhaps Fillmore Auditorium) on 1966-07-01"],["03-07-1966","Grateful Dead Live at Fillmore Auditorium on 1966-07-03"],["16-07-1966","Grateful Dead Live at Fillmore Auditorium on 1966-07-16"],["17-07-1966","Grateful Dead Live at Fillmore Auditorium on 1966-07-17"],["29-07-1966","Grateful Dead Live at P.N.E. Garden Auditorium on 1966-07-29"],["30-07-1966","Grateful Dead Live at P.N.E. Garden Auditorium on 1966-07-30"],["16-09-1966","Grateful Dead Live at Avalon Ballroom on 1966-09-16"],["02-10-1966","Grateful Dead Live at San Francisco State University on 1966-10-02"],["07-10-1966","Grateful Dead Live at Winterland Arena on 1966-10-07"],["31-10-1966","Grateful Dead Live at Winterland Arena on 1966-10-31"],["19-11-1966","Grateful Dead Live at Fillmore Auditorium on 1966-11-19"],["29-11-1966","Grateful Dead Live at The Matrix on 1966-11-29"],["01-12-1966","Grateful Dead Live at The Matrix on 1966-12-01"],["05-12-1966","Grateful Dead Live at Studio on 1966-12-05"],["14-01-1967","Grateful Dead Live at Fillmore Auditorium on 1967-01-14"],["27-01-1967","Grateful Dead Live at Avalon Ballroom on 1967-01-27"],["12-02-1967","Grateful Dead Live at Unknown on 1967-02-12"],["18-03-1967","Grateful Dead Live at Winterland Arena on 1967-03-18"],["08-04-1967","Grateful Dead Live at KPIX-TV Studios on 1967-04-08"],["05-05-1967","Grateful Dead Live at Fillmore Auditorium on 1967-05-05"],["18-06-1967","Grateful Dead Live at Monterey Fairgrounds on 1967-06-18"],["23-07-1967","Grateful Dead Live at Straight Theater, Haight Street on 1967-07-23"],["04-08-1967","Grateful Dead Live at O'Keefe Center on 1967-08-04"],["05-08-1967","Grateful Dead Live at O'Keefe Center on 1967-08-05"],["03-09-1967","Grateful Dead Live at Dance Hall on 1967-09-03"],["04-09-1967","Grateful Dead Live at Dance Hall on 1967-09-04"],["15-09-1967","Grateful Dead Live at Hollywood Bowl on 1967-09-15"],["20-10-1967","Grateful Dead Live at American Studios on 1967-10-20"],["22-10-1967","Grateful Dead Live at Winterland Arena on 1967-10-22"],["31-10-1967","Grateful Dead Live at Winterland Arena on 1967-10-31"],["10-11-1967","Grateful Dead Live at Shrine Auditorium on 1967-11-10"],["11-11-1967","Grateful Dead Live at Shrine Auditorium on 1967-11-11"],["14-11-1967","Grateful Dead Live at American Studios on 1967-11-14"],["17-01-1968","Grateful Dead Live at Carousel Ballroom on 1968-01-17"],["20-01-1968","Grateful Dead Live at Eureka Municipal Auditorium on 1968-01-20"],["22-01-1968","Grateful Dead Live at Eagle's Auditorium on 1968-01-22"],["23-01-1968","Grateful Dead Live at Crystal Ballroom on 1968-01-23"],["27-01-1968","Grateful Dead Live at Eagle's Auditorium on 1968-01-27"],["02-02-1968","Grateful Dead Live at Crystal Ballroom on 1968-02-02"],["03-02-1968","Grateful Dead Live at Crystal Ballroom on 1968-02-03"],["14-02-1968","Grateful Dead Live at Carousel Ballroom on 1968-02-14"],["03-03-1968","Grateful Dead Live at Haight Street on 1968-03-03"],["16-03-1968","Grateful Dead Live at Carousel Ballroom on 1968-03-16"],["29-03-1968","Grateful Dead Live at Carousel Ballroom on 1968-03-29"],["30-03-1968","Grateful Dead Live at Carousel Ballroom on 1968-03-30"],["31-03-1968","Grateful Dead Live at Carousel Ballroom on 1968-03-31"],["18-05-1968","Grateful Dead Live at County Fairgrounds on 1968-05-18"],["08-06-1968","Grateful Dead Live at Carousel Ballroom on 1968-06-08"],["14-06-1968","Grateful Dead Live at Fillmore East on 1968-06-14"],["19-06-1968","Grateful Dead Live at Carousel Ballroom on 1968-06-19"],["21-08-1968","Grateful Dead Live at Fillmore West on 1968-08-21"],["22-08-1968","Grateful Dead Live at Fillmore West on 1968-08-22"],["23-08-1968","Grateful Dead Live at Shrine Auditorium on 1968-08-23"],["28-08-1968","Grateful Dead Live at Avalon Ballroom on 1968-08-28"],["02-09-1968","Grateful Dead Live at Betty Nelson's Organic Raspberry Farm on 1968-09-02"],["12-09-1968","Grateful Dead Live at Unknown (possibly Pacific High Recording) on 1968-09-12"],["20-09-1968","Grateful Dead Live at Eagle's Auditorium on 1968-09-20"],["08-10-1968","Grateful Dead Live at The Matrix on 1968-10-08"],["10-10-1968","Grateful Dead Live at The Matrix on 1968-10-10"],["12-10-1968","Grateful Dead Live at Avalon Ballroom on 1968-10-12"],["13-10-1968","Grateful Dead Live at Avalon Ballroom on 1968-10-13"],["20-10-1968","Grateful Dead Live at Greek Theatre, U. Of California on 1968-10-20"],["30-10-1968","Grateful Dead Live at The Matrix on 1968-10-30"],["01-11-1968","Grateful Dead Live at Silver Dollar Fair on 1968-11-01"],["06-11-1968","Grateful Dead Live at Alembic Studios on 1968-11-06"],["22-11-1968","Grateful Dead Live at Columbus Veterans Hall on 1968-11-22"],["07-12-1968","Grateful Dead Live at Bellarmine College on 1968-12-07"],["16-12-1968","Grateful Dead Live at The Matrix on 1968-12-16"],["20-12-1968","Grateful Dead Live at Shrine Auditorium on 1968-12-20"],["21-12-1968","Grateful Dead Live at Shrine Exhibition Hall on 1968-12-21"],["29-12-1968","Grateful Dead Live at Gulfstream Park Racetrack on 1968-12-29"],["17-01-1969","Grateful Dead Live at Civic Auditorium on 1969-01-17"],["18-01-1969","Grateful Dead Live at CBS Studios in West Hollywood on 1969-01-18"],["24-01-1969","Grateful Dead Live at Avalon Ballroom on 1969-01-24"],["25-01-1969","Grateful Dead Live at Avalon Ballroom on 1969-01-25"],["26-01-1969","Grateful Dead Live at Avalon Ballroom on 1969-01-26"],["02-02-1969","Grateful Dead Live at Labor Temple on 1969-02-02"],["04-02-1969","Grateful Dead Live at The Music Box on 1969-02-04"],["05-02-1969","Grateful Dead Live at Soldiers & Sailors Memorial Auditorium on 1969-02-05"],["06-02-1969","Grateful Dead Live at Kiel Auditorium on 1969-02-06"],["07-02-1969","Grateful Dead Live at Stanley Theater on 1969-02-07"],["12-02-1969","Grateful Dead Live at Fillmore East on 1969-02-12"],["14-02-1969","Grateful Dead Live at Electric Factory on 1969-02-14"],["15-02-1969","Grateful Dead Live at Electric Factory on 1969-02-15"],["21-02-1969","Grateful Dead Live at Dream Bowl on 1969-02-21"],["22-02-1969","Grateful Dead Live at Dream Bowl on 1969-02-22"],["27-02-1969","Grateful Dead Live at Fillmore West on 1969-02-27"],["28-02-1969","Grateful Dead"],["01-03-1969","Grateful Dead"],["02-03-1969","Grateful Dead"],["15-03-1969","Grateful Dead Live at Hilton Hotel on 1969-03-15"],["22-03-1969","Grateful Dead Live at Rose Palace on 1969-03-22"],["28-03-1969","Grateful Dead Live at Student Center on 1969-03-28"],["29-03-1969","Grateful Dead Live at Ice Palace on 1969-03-29"],["04-04-1969","Grateful Dead Live at Avalon Ballroom on 1969-04-04"],["05-04-1969","Grateful Dead Live at Avalon Ballroom on 1969-04-05"],["06-04-1969","Grateful Dead Live at Avalon Ballroom on 1969-04-06"],["11-04-1969","Grateful Dead Live at University Auditorium, U. Arizona on 1969-04-11"],["12-04-1969","Grateful Dead Live at Student Union Ballroom, U. Utah on 1969-04-12"],["13-04-1969","Grateful Dead Live at Ballroom on 1969-04-13"],["15-04-1969","Grateful Dead Live at The Music Box on 1969-04-15"],["17-04-1969","Grateful Dead Live at Washington University on 1969-04-17"],["18-04-1969","Grateful Dead Live at Purdue University on 1969-04-18"],["20-04-1969","Grateful Dead Live at Clark University on 1969-04-20"],["21-04-1969","Grateful Dead Live at The Ark on 1969-04-21"],["22-04-1969","Grateful Dead Live at The Ark on 1969-04-22"],["23-04-1969","Grateful Dead Live at The Ark on 1969-04-23"],["25-04-1969","Grateful Dead Live at Electric Theater on 1969-04-25"],["26-04-1969","Grateful Dead Live at Electric Theater on 1969-04-26"],["27-04-1969","Grateful Dead Live at Labor Temple on 1969-04-27"],["03-05-1969","Grateful Dead Live at Winterland Arena on 1969-05-03"],["07-05-1969","Grateful Dead Live at Polo Field, Golden Gate Park on 1969-05-07"],["10-05-1969","Grateful Dead Live at Rose Palace on 1969-05-10"],["11-05-1969","Grateful Dead Live at Aztec Bowl, San Diego State U. on 1969-05-11"],["16-05-1969","Grateful Dead Live at Campolindo High School on 1969-05-16"],["23-05-1969","Grateful Dead Live at Seminole Indian Village on 1969-05-23"],["24-05-1969","Grateful Dead Live at Seminole Indian Village on 1969-05-24"],["29-05-1969","Grateful Dead Live at Robertson Gym, U.C.S.B. on 1969-05-29"],["30-05-1969","Grateful Dead Live at Springer's Inn on 1969-05-30"],["31-05-1969","Grateful Dead Live at McArthur Court, University of Oregon on 1969-05-31"],["01-06-1969","Grateful Dead Live at Avalon Ballroom on 1969-06-01"],["05-06-1969","Grateful Dead Live at Fillmore West on 1969-06-05"],["06-06-1969","Grateful Dead Live at Fillmore West on 1969-06-06"],["07-06-1969","Grateful Dead Live at Fillmore West on 1969-06-07"],["08-06-1969","Grateful Dead Live at Fillmore West on 1969-06-08"],["11-06-1969","Grateful Dead Live at California Hall on 1969-06-11"],["13-06-1969","Grateful Dead Live at Fresno Convention Center on 1969-06-13"],["14-06-1969","Grateful Dead Live at Monterey Performing Arts Center on 1969-06-14"],["20-06-1969","Grateful Dead Live at Pacific Recording Studios on 1969-06-20"],["21-06-1969","Grateful Dead Live at Fillmore East on 1969-06-21"],["22-06-1969","Grateful Dead Live at Central Park on 1969-06-22"],["27-06-1969","Grateful Dead Live at Veterans Auditorium on 1969-06-27"],["28-06-1969","Grateful Dead Live at Veterans Auditorium on 1969-06-28"],["03-07-1969","Grateful Dead Live at Reed's Ranch on 1969-07-03"],["04-07-1969","Grateful Dead live 1969-07-04 at Electric Theater - ReSBD"],["05-07-1969","Grateful Dead Live at Electric Theater on 1969-07-05"],["07-07-1969","Grateful Dead Live at Piedmont Park on 1969-07-07"],["11-07-1969","Grateful Dead Live at NY State Pavilion, Flushing Meadow Park on 1969-07-11"],["12-07-1969","Grateful Dead Live at NY State Pavilion, Flushing Meadow Park on 1969-07-12"],["02-08-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-08-02"],["03-08-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-08-03"],["16-08-1969","Grateful Dead Live at Yasgur's Farm on 1969-08-16"],["21-08-1969","Grateful Dead Live at Green Lake Aqua Theater on 1969-08-21"],["23-08-1969","Grateful Dead Live at Pelletier Farm on 1969-08-23"],["28-08-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-08-28"],["29-08-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-08-29"],["30-08-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-08-30"],["01-09-1969","Grateful Dead Live at Baton Rouge Int. Speedway on 1969-09-01"],["06-09-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-09-06"],["07-09-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-09-07"],["11-09-1969","Grateful Dead Live at The Family Dog at the Great Highway (?) on 1969-09-11"],["17-09-1969","Grateful Dead Live at Alembic Studios on 1969-09-17"],["26-09-1969","Grateful Dead Live at Fillmore East on 1969-09-26"],["27-09-1969","Grateful Dead Live at Fillmore East (Early show) on 1969-09-27"],["29-09-1969","Grateful Dead Live at Cafe au Go-Go on 1969-09-29"],["30-09-1969","Grateful Dead Live at Cafe au Go-Go on 1969-09-30"],["24-10-1969","Grateful Dead Live at Winterland Arena on 1969-10-24"],["25-10-1969","Grateful Dead Live at Winterland Arena on 1969-10-25"],["26-10-1969","Grateful Dead"],["28-10-1969","1969-10-28 Jerry Garcia, Jorma Kaukonen, Mickey Hart, Jack Casady, Spencer Dryden"],["31-10-1969","Grateful Dead Live at San Jose State University on 1969-10-31"],["01-11-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-11-01"],["02-11-1969","Grateful Dead Live at Family Dog at the Great Highway on 1969-11-02"],["07-11-1969","Grateful Dead Live at Fillmore Auditorium on 1969-11-07"],["08-11-1969","Grateful Dead Live at Fillmore Auditorium on 1969-11-08"],["15-11-1969","Grateful Dead Live at Lanai Theater on 1969-11-15"],["21-11-1969","Grateful Dead Live at Cal Expo, Building A on 1969-11-21"],["04-12-1969","Grateful Dead Live at Fillmore West on 1969-12-04"],["05-12-1969","Grateful Dead Live at Fillmore West on 1969-12-05"],["07-12-1969","Grateful Dead Live at Fillmore West on 1969-12-07"],["10-12-1969","Grateful Dead Live at Thelma Theater on 1969-12-10"],["11-12-1969","Grateful Dead Live at Thelma Theater on 1969-12-11"],["12-12-1969","Grateful Dead Live at Thelma Theater on 1969-12-12"],["13-12-1969","Grateful Dead Live at Swing Auditorium on 1969-12-13"],["19-12-1969","Grateful Dead Live at Fillmore Auditorium on 1969-12-19"],["20-12-1969","Grateful Dead Live at Fillmore Auditorium on 1969-12-20"],["21-12-1969","Grateful Dead Live at Fillmore Auditorium on 1969-12-21"],["26-12-1969","Grateful Dead Live at McFarlin Auditorium, S.M.U. on 1969-12-26"],["28-12-1969","Grateful Dead Live at International Speedway on 1969-12-28"],["29-12-1969","Grateful Dead Live at Boston Tea Party on 1969-12-29"],["30-12-1969","Grateful Dead Live at Boston Tea Party on 1969-12-30"],["31-12-1969","Grateful Dead Live at Home Recordings on 1969-12-31"],["01-01-1970","Grateful Dead Live at Studio- Workingman's Dead Outtakes on 1970-01-01"],["02-01-1970","Grateful Dead Live at Fillmore East (Late Show) on 1970-01-02"],["03-01-1970","Grateful Dead Live at Fillmore East on 1970-01-03"],["10-01-1970","Grateful Dead Live at Golden Hall on 1970-01-10"],["16-01-1970","Grateful Dead Live at Springer's Inn Portland on 1970-01-16"],["17-01-1970","Grateful Dead Live at Oregon State University on 1970-01-17"],["23-01-1970","Grateful Dead Live at Honolulu Civic Auditorium on 1970-01-23"],["24-01-1970","Grateful Dead Live at Honolulu Civic Auditorium on 1970-01-24"],["30-01-1970","Grateful Dead Live at The Warehouse on 1970-01-30"],["31-01-1970","Grateful Dead Live at The Warehouse on 1970-01-31"],["01-02-1970","Grateful Dead Live at The Warehouse on 1970-02-01"],["02-02-1970","Grateful Dead Live at Fox Theatre on 1970-02-02"],["04-02-1970","Revisiting The Grateful Dead \u2022 1970-02-04"],["05-02-1970","Grateful Dead Live at Fillmore West on 1970-02-05"],["06-02-1970","Grateful Dead Live at Fillmore West on 1970-02-06"],["07-02-1970","Grateful Dead Live at Fillmore West on 1970-02-07"],["08-02-1970","Grateful Dead Live at Fillmore West on 1970-02-08"],["11-02-1970","Grateful Dead Live at Fillmore East on 1970-02-11"],["12-02-1970","Grateful Dead Live at Ungano's Night Club on 1970-02-12"],["13-02-1970","Grateful Dead Live at Fillmore East on 1970-02-13"],["14-02-1970","Grateful Dead Live at Fillmore East on 1970-02-14"],["23-02-1970","Grateful Dead Live at The Auditorium on 1970-02-23"],["27-02-1970","Grateful Dead Live at Family Dog at the Great Highway on 1970-02-27"],["28-02-1970","Grateful Dead Live at Family Dog at the Great Highway on 1970-02-28"],["01-03-1970","Grateful Dead Live at Family Dog at the Great Highway on 1970-03-01"],["07-03-1970","Grateful Dead Live at Civic Auditorium on 1970-03-07"],["08-03-1970","Grateful Dead Live at Star Theatre on 1970-03-08"],["20-03-1970","Grateful Dead Live at Capitol Theater on 1970-03-20"],["21-03-1970","Grateful Dead Live at Capitol Theater on 1970-03-21"],["24-03-1970","Grateful Dead Live at Pirates World on 1970-03-24"],["03-04-1970","Grateful Dead Live at Field House, U. of Cincinnati on 1970-04-03"],["09-04-1970","Grateful Dead Live at Fillmore West on 1970-04-09"],["11-04-1970","Grateful Dead Live at Fillmore West on 1970-04-11"],["12-04-1970","Grateful Dead Live at Fillmore West on 1970-04-12"],["15-04-1970","Grateful Dead Live at Winterland Arena on 1970-04-15"],["24-04-1970","Grateful Dead Live at Mammoth Gardens on 1970-04-24"],["01-05-1970","Grateful Dead Live at Alfred College on 1970-05-01"],["02-05-1970","Grateful Dead Live at Harpur College on 1970-05-02"],["03-05-1970","Grateful Dead Live at Field House, Wesleyan University on 1970-05-03"],["06-05-1970","Grateful Dead Live at Kresge Plaza, M.I.T. on 1970-05-06"],["07-05-1970","Grateful Dead Live at Dupont Gymnasium M.I.T. on 1970-05-07"],["08-05-1970","Grateful Dead Live at Farrell Hall (SUNY) on 1970-05-08"],["09-05-1970","Grateful Dead Live at Worcester Polytechnic Institute on 1970-05-09"],["14-05-1970","Grateful Dead Live at Merramec Community College on 1970-05-14"],["15-05-1970","Grateful Dead Live at Fillmore East (Late Show) on 1970-05-15"],["16-05-1970","Grateful Dead Live at Temple University on 1970-05-16"],["24-05-1970","Grateful Dead Live at Unknown Venue on 1970-05-24"],["04-06-1970","Grateful Dead Live at Fillmore West on 1970-06-04"],["05-06-1970","Grateful Dead Live at Fillmore West on 1970-06-05"],["06-06-1970","Grateful Dead Live at Fillmore West on 1970-06-06"],["07-06-1970","Grateful Dead Live at Fillmore West on 1970-06-07"],["13-06-1970","Grateful Dead Live at Red Vest on 1970-06-13"],["21-06-1970","Grateful Dead Live at Pauley Ballroom, U. of California on 1970-06-21"],["24-06-1970","Grateful Dead Live at Capitol Theater on 1970-06-24"],["01-07-1970","Grateful Dead Live at Winnipeg Fairgrounds on 1970-07-01"],["10-07-1970","Grateful Dead Live at Fillmore East on 1970-07-10"],["11-07-1970","Grateful Dead Live at Fillmore East on 1970-07-11"],["12-07-1970","Grateful Dead Live at Fillmore East on 1970-07-12"],["14-07-1970","Grateful Dead Live at Euphoria Ballroom on 1970-07-14"],["16-07-1970","Grateful Dead Live at Euphoria Ballroom on 1970-07-16"],["30-07-1970","Grateful Dead Live at The Matrix on 1970-07-30"],["05-08-1970","Grateful Dead Live at Golden Hall Community Concourse on 1970-08-05"],["17-08-1970","Grateful Dead Live at Fillmore West on 1970-08-17"],["18-08-1970","Grateful Dead Live at Fillmore West on 1970-08-18"],["19-08-1970","Grateful Dead Live at Fillmore West on 1970-08-19"],["30-08-1970","Grateful Dead Live at KQED Studios on 1970-08-30"],["17-09-1970","Grateful Dead Live at Fillmore East on 1970-09-17"],["18-09-1970","Grateful Dead Live at Fillmore East on 1970-09-18"],["19-09-1970","Grateful Dead Live at Fillmore East on 1970-09-19"],["20-09-1970","Grateful Dead Live at Fillmore East on 1970-09-20"],["04-10-1970","Grateful Dead Live at Winterland Arena on 1970-10-04"],["10-10-1970","Grateful Dead Live at Colden Auditorium, Queens College on 1970-10-10"],["11-10-1970","Grateful Dead Live at Marion Shea Auditorium, Paterson State College on 1970-10-11"],["17-10-1970","Grateful Dead Live at Cleveland Music Hall on 1970-10-17"],["23-10-1970","Grateful Dead Live at McDonough Arena, Georgetown U. on 1970-10-23"],["24-10-1970","Grateful Dead Live at Kiel Opera House on 1970-10-24"],["30-10-1970","Grateful Dead Live at SUNY Stonybrook on 1970-10-30"],["31-10-1970","Grateful Dead Live at Gym, S.U.N.Y. on 1970-10-31"],["05-11-1970","Grateful Dead Live at Capitol Theater on 1970-11-05"],["06-11-1970","Grateful Dead Live at Capitol Theater on 1970-11-06"],["07-11-1970","Grateful Dead Live at Capitol Theater on 1970-11-07"],["08-11-1970","Grateful Dead Live at Capitol Theater on 1970-11-08"],["09-11-1970","Grateful Dead Live at Action House on 1970-11-09"],["10-11-1970","Grateful Dead Live at Action House on 1970-11-10"],["11-11-1970","Grateful Dead Live at 46th Street Rock Palace on 1970-11-11"],["12-11-1970","Grateful Dead Live at 46th Street Rock Palace on 1970-11-12"],["16-11-1970","Grateful Dead Live at Fillmore East on 1970-11-16"],["20-11-1970","Grateful Dead Live at The Palestra, U. of Rochester on 1970-11-20"],["21-11-1970","Grateful Dead Live at Sargent Gym, Boston University on 1970-11-21"],["23-11-1970","Grateful Dead Live at Anderson Theatre on 1970-11-23"],["29-11-1970","Grateful Dead Live at Club Agora on 1970-11-29"],["12-12-1970","Grateful Dead Live at Santa Rosa Fairgrounds on 1970-12-12"],["17-12-1970","Grateful Dead Live at The Matrix on 1970-12-17"],["23-12-1970","Grateful Dead Live at Winterland Arena on 1970-12-23"],["26-12-1970","Grateful Dead Live at Legion Stadium on 1970-12-26"],["27-12-1970","Grateful Dead Live at Legion Stadium on 1970-12-27"],["28-12-1970","Grateful Dead Live at Legion Stadium on 1970-12-28"],["31-12-1970","Grateful Dead Live at Winterland Arena on 1970-12-31"],["21-01-1971","Grateful Dead Live at Freeborn Hall, University of California on 1971-01-21"],["22-01-1971","Grateful Dead Live at Lane Community College on 1971-01-22"],["24-01-1971","Grateful Dead Live at Seattle Center Arena on 1971-01-24"],["01-02-1971","Grateful Dead Live at Unknown on 1971-02-01"],["18-02-1971","Grateful Dead Live at Capitol Theater on 1971-02-18"],["19-02-1971","Grateful Dead Live at Capitol Theatre on 1971-02-19"],["20-02-1971","Grateful Dead Live at Capitol Theater on 1971-02-20"],["21-02-1971","Grateful Dead Live at Capitol Theater on 1971-02-21"],["23-02-1971","Grateful Dead Live at Capitol Theater, Portchester NY on 1971-02-23"],["24-02-1971","Grateful Dead Live at Capitol Theater on 1971-02-24"],["03-03-1971","Grateful Dead Live at Fillmore West on 1971-03-03"],["14-03-1971","Grateful Dead Live at Camp Randall Field House on 1971-03-14"],["18-03-1971","Grateful Dead Live at Fox Theatre on 1971-03-18"],["20-03-1971","Grateful Dead Live at University of Iowa on 1971-03-20"],["21-03-1971","Grateful Dead Live at Exposition Center on 1971-03-21"],["24-03-1971","Grateful Dead Live at Winterland Arena on 1971-03-24"],["04-04-1971","Grateful Dead Live at Manhattan Center on 1971-04-04"],["05-04-1971","Grateful Dead Live at Manhattan Center on 1971-04-05"],["06-04-1971","Grateful Dead Live at Manhattan Center on 1971-04-06"],["07-04-1971","Grateful Dead Live at Boston Music Hall on 1971-04-07"],["08-04-1971","Grateful Dead Live at Boston Music Hall on 1971-04-08"],["10-04-1971","Grateful Dead Live at East Hall, Franklin & Marshall College on 1971-04-10"],["12-04-1971","Grateful Dead Live at Civic Arena on 1971-04-12"],["13-04-1971","Grateful Dead Live at Catholic Youth Center on 1971-04-13"],["14-04-1971","Grateful Dead Live at Davis Gym, Bucknell University on 1971-04-14"],["15-04-1971","Grateful Dead Live at Allegheny College on 1971-04-15"],["17-04-1971","Grateful Dead Live at Dillon Gym, Princeton University on 1971-04-17"],["18-04-1971","Grateful Dead Live at Lusk Field House, S.U.C.N.Y on 1971-04-18"],["21-04-1971","Grateful Dead Live at Rhode Island Auditorium on 1971-04-21"],["22-04-1971","Grateful Dead Live at Bangor Municipal Auditorium on 1971-04-22"],["24-04-1971","Grateful Dead Live at Wallace Wade Stadium, Duke University on 1971-04-24"],["25-04-1971","Grateful Dead Live at Fillmore East on 1971-04-25"],["26-04-1971","Grateful Dead Live at Fillmore East on 1971-04-26"],["27-04-1971","Grateful Dead Live at Fillmore East on 1971-04-27"],["28-04-1971","Grateful Dead Live at Fillmore East on 1971-04-28"],["29-04-1971","Grateful Dead Live at Fillmore East on 1971-04-29"],["29-05-1971","Grateful Dead Live at Winterland Arena on 1971-05-29"],["30-05-1971","Grateful Dead Live at Winterland Arena on 1971-05-30"],["21-06-1971","Grateful Dead Live at Chateau d'HerouvilIe on 1971-06-21"],["02-07-1971","Grateful Dead Live at Fillmore West on 1971-07-02"],["31-07-1971","Grateful Dead Live at Yale Bowl, Yale University on 1971-07-31"],["04-08-1971","Grateful Dead Live at Terminal Island Correctional Facility on 1971-08-04"],["05-08-1971","Grateful Dead Live at Hollywood Palladium on 1971-08-05"],["06-08-1971","Grateful Dead Live at Hollywood Palladium on 1971-08-06"],["14-08-1971","Grateful Dead Live at Berkeley Community Theater on 1971-08-14"],["15-08-1971","Grateful Dead Live at Berkeley Community Theater on 1971-08-15"],["21-08-1971","Grateful Dead Live at Mickey's Barn on 1971-08-21"],["23-08-1971","Grateful Dead Live at Auditorium Theatre on 1971-08-23"],["26-08-1971","Grateful Dead Live at Gaelic Park on 1971-08-26"],["28-09-1971","Grateful Dead Live at Studio on 1971-09-28"],["29-09-1971","Grateful Dead Live at Studio Rehearsals with Keith Godchaux on 1971-09-29"],["30-09-1971","Grateful Dead Live at Studio on 1971-09-30"],["01-10-1971","Grateful Dead Live at Studio on 1971-10-01"],["19-10-1971","Grateful Dead Live at Northrop Auditorium, U. of Minn. on 1971-10-19"],["21-10-1971","Grateful Dead Live at Auditorium Theatre on 1971-10-21"],["22-10-1971","Grateful Dead Live at Auditorium Theatre on 1971-10-22"],["23-10-1971","Grateful Dead Live at Easttown Theatre on 1971-10-23"],["24-10-1971","Grateful Dead Live at Eastown Theater on 1971-10-24"],["26-10-1971","Grateful Dead Live at The Palestra, U. of Rochester on 1971-10-26"],["27-10-1971","Grateful Dead Live at Onondaga War Memorial on 1971-10-27"],["29-10-1971","Grateful Dead Live at Allen Theatre on 1971-10-29"],["30-10-1971","Grateful Dead Live at Taft Auditorium on 1971-10-30"],["31-10-1971","Grateful Dead Live at Ohio Theatre on 1971-10-31"],["06-11-1971","Grateful Dead Live at Harding Theater on 1971-11-06"],["07-11-1971","Grateful Dead Live at Harding Theater on 1971-11-07"],["11-11-1971","Grateful Dead Live at Atlanta Municipal Auditorium on 1971-11-11"],["12-11-1971","Grateful Dead Live at San Antonio Civic Auditorium on 1971-11-12"],["14-11-1971","Grateful Dead Live at Texas Christian University on 1971-11-14"],["15-11-1971","Grateful Dead Live at Austin Municipal Auditorium on 1971-11-15"],["17-11-1971","Grateful Dead Live at Albuquerque Civic Auditorium on 1971-11-17"],["20-11-1971","Grateful Dead Live at Pauley Pavilion, UCLA on 1971-11-20"],["01-12-1971","Grateful Dead Live at Boston Music Hall on 1971-12-01"],["02-12-1971","Grateful Dead Live at Boston Music Hall on 1971-12-02"],["04-12-1971","Grateful Dead Live at Felt Forum, Madison Square Garden on 1971-12-04"],["05-12-1971","Grateful Dead Live at Felt Forum, Madison Square Garden on 1971-12-05"],["06-12-1971","Grateful Dead Live at Felt Forum, Madison Square Garden on 1971-12-06"],["07-12-1971","Grateful Dead Live at Felt Forum, Madison Square Garden on 1971-12-07"],["09-12-1971","Grateful Dead Live at Fox Theatre on 1971-12-09"],["10-12-1971","Grateful Dead Live at Fox Theatre on 1971-12-10"],["14-12-1971","Grateful Dead Live at Hill Auditorium on 1971-12-14"],["15-12-1971","Grateful Dead Live at Hill Auditorium on 1971-12-15"],["31-12-1971","Grateful Dead Live at Winterland Arena on 1971-12-31"],["02-01-1972","Grateful Dead Live at Winterland Arena on 1972-01-02"],["01-03-1972","Grateful Dead Live at Alembic Studios on 1972-03-01"],["05-03-1972","Grateful Dead Live at Winterland Arena on 1972-03-05"],["21-03-1972","Grateful Dead Live at Academy of Music on 1972-03-21"],["22-03-1972","Grateful Dead Live at Academy of Music on 1972-03-22"],["23-03-1972","Grateful Dead Live at Academy of Music on 1972-03-23"],["25-03-1972","Grateful Dead Live at Academy of Music on 1972-03-25"],["26-03-1972","Grateful Dead Live at Academy of Music on 1972-03-26"],["27-03-1972","Grateful Dead Live at Academy of Music on 1972-03-27"],["28-03-1972","Grateful Dead Live at Academy of Music on 1972-03-28"],["07-04-1972","Grateful Dead Live at Wembley Empire Pool on 1972-04-07"],["08-04-1972","Grateful Dead Live at Wembley Empire Pool on 1972-04-08"],["11-04-1972","Grateful Dead Live at Newcastle City Hall on 1972-04-11"],["14-04-1972","The Grateful Dead - Insane Edition"],["16-04-1972","Grateful Dead Live at Aarhus University on 1972-04-16"],["17-04-1972","Grateful Dead Live at Tivoli Gardens on 1972-04-17"],["21-04-1972","Grateful Dead Live at Beat Club on 1972-04-21"],["24-04-1972","Grateful Dead Live at Rheinhalle on 1972-04-24"],["26-04-1972","Grateful Dead Live at Jahrhunderthalle on 1972-04-26"],["29-04-1972","Grateful Dead Live at Musikhalle on 1972-04-29"],["03-05-1972","Grateful Dead Live at L'Olympia on 1972-05-03"],["04-05-1972","Grateful Dead Live at L'Olympia on 1972-05-04"],["07-05-1972","Grateful Dead Live at Bickershaw Festival on 1972-05-07"],["10-05-1972","Grateful Dead Live at Concertgebouw on 1972-05-10"],["11-05-1972","Grateful Dead Live at Rotterdam Civic Hall on 1972-05-11"],["13-05-1972","Grateful Dead Live at Lille Fairgrounds on 1972-05-13"],["16-05-1972","Grateful Dead Live at Theatre Hall on 1972-05-16"],["18-05-1972","Grateful Dead Live at Kongressaal, Deutsches Museum on 1972-05-18"],["23-05-1972","Grateful Dead Live at Strand Lyceum on 1972-05-23"],["24-05-1972","Grateful Dead Live at The Strand Lyceum on 1972-05-24"],["25-05-1972","Grateful Dead Live at The Strand Lyceum on 1972-05-25"],["26-05-1972","Grateful Dead Live at The Strand Lyceum on 1972-05-26"],["17-06-1972","Grateful Dead Live at Hollywood Bowl on 1972-06-17"],["16-07-1972","Grateful Dead Live at Dillon Stadium on 1972-07-16"],["18-07-1972","Grateful Dead Live at Roosevelt Stadium on 1972-07-18"],["21-07-1972","Grateful Dead Live at Paramount Northwest Theater on 1972-07-21"],["22-07-1972","Grateful Dead Live at Paramount Northwest Theatre on 1972-07-22"],["25-07-1972","Grateful Dead Live at Paramount Theater on 1972-07-25"],["26-07-1972","Grateful Dead Live at Paramount Theater on 1972-07-26"],["12-08-1972","Grateful Dead Live at Sacramento Memorial Auditorium on 1972-08-12"],["20-08-1972","Grateful Dead Live at San Jose Civic Auditorium on 1972-08-20"],["21-08-1972","Grateful Dead Live at Berkeley Community Theater on 1972-08-21"],["22-08-1972","Grateful Dead Live at Berkeley Community Theatre on 1972-08-22"],["24-08-1972","The Grateful Dead - Insane Edition"],["25-08-1972","Grateful Dead Live at Berkeley Community Theater on 1972-08-25"],["27-08-1972","Grateful Dead Sunshine Daydream 1972-08-27"],["03-09-1972","Grateful Dead Live at Folsom Field - University of Colorado on 1972-09-03"],["09-09-1972","Grateful Dead Live at Hollywood Palladium on 1972-09-09"],["10-09-1972","Grateful Dead Live at Hollywood Palladium on 1972-09-10"],["15-09-1972","Grateful Dead Live at Boston Music Hall on 1972-09-15"],["16-09-1972","Grateful Dead Live at Boston Music Hall on 1972-09-16"],["17-09-1972","Grateful Dead Live at Baltimore Civic Center on 1972-09-17"],["19-09-1972","Grateful Dead Live at Roosevelt Stadium on 1972-09-19"],["21-09-1972","The Grateful Dead - Insane Edition"],["23-09-1972","Grateful Dead Live at Palace Theater on 1972-09-23"],["24-09-1972","Grateful Dead Live at Palace Theatre on 1972-09-24"],["26-09-1972","Grateful Dead Live at Stanley Theatre on 1972-09-26"],["27-09-1972","Grateful Dead Live at Stanley Theatre on 1972-09-27"],["28-09-1972","Grateful Dead Live at Stanley Theatre on 1972-09-28"],["30-09-1972","Grateful Dead Live at American University on 1972-09-30"],["02-10-1972","Grateful Dead Live at Springfield Civic Center on 1972-10-02"],["09-10-1972","Grateful Dead Live at Winterland Arena on 1972-10-09"],["17-10-1972","Grateful Dead Live at Fox Theatre on 1972-10-17"],["18-10-1972","Grateful Dead Live at Fox Theatre on 1972-10-18"],["19-10-1972","Grateful Dead Live at Fox Theatre on 1972-10-19"],["21-10-1972","Grateful Dead Live at Vanderbilt University on 1972-10-21"],["23-10-1972","Grateful Dead Live at Milwaukee Performing Arts Center on 1972-10-23"],["24-10-1972","Grateful Dead Live at Milwaukee Performing Arts Center on 1972-10-24"],["26-10-1972","Grateful Dead Live at Cincinnati Music Hall on 1972-10-26"],["27-10-1972","Grateful Dead Live at Veterans' Memorial Hall on 1972-10-27"],["28-10-1972","Grateful Dead Live at Cleveland Public Hall on 1972-10-28"],["30-10-1972","Grateful Dead Live at Ford Auditorium on 1972-10-30"],["12-11-1972","Grateful Dead Live at Soldiers' and Sailors' Memorial Hall on 1972-11-12"],["13-11-1972","Grateful Dead Live at Soldiers and Sailors Memorial Hall on 1972-11-13"],["14-11-1972","Grateful Dead Live at Oklahoma City Music Hall on 1972-11-14"],["15-11-1972","Grateful Dead Live at Oklahoma City Music Hall on 1972-11-15"],["17-11-1972","Grateful Dead Live at Century II Convention Hall on 1972-11-17"],["18-11-1972","Grateful Dead Live at Hofheinz Pavilion on 1972-11-18"],["19-11-1972","Grateful Dead Live at Hofheinz Pavilion on 1972-11-19"],["22-11-1972","Grateful Dead Live at Austin Municipal Auditorium on 1972-11-22"],["24-11-1972","Grateful Dead Live at Dallas Memorial Auditorium on 1972-11-24"],["26-11-1972","Grateful Dead Live at San Antonio Civic Auditorium on 1972-11-26"],["10-12-1972","Grateful Dead Live at Winterland Arena on 1972-12-10"],["11-12-1972","Grateful Dead Live at Winterland Arena on 1972-12-11"],["12-12-1972","Grateful Dead Live at Winterland Arena on 1972-12-12"],["15-12-1972","Grateful Dead Live at Long Beach Arena on 1972-12-15"],["31-12-1972","Grateful Dead Live at Winterland Arena on 1972-12-31"],["09-02-1973","Grateful Dead Live at Roscoe Maples Pavilion, Stanford U. on 1973-02-09"],["15-02-1973","Grateful Dead Live at Dane County Coliseum on 1973-02-15"],["17-02-1973","Grateful Dead Live at St. Paul Auditorium on 1973-02-17"],["19-02-1973","Grateful Dead Live at International Amphitheatre on 1973-02-19"],["21-02-1973","Grateful Dead Live at Assembly Hall, University of Illinois on 1973-02-21"],["22-02-1973","Grateful Dead Live at Assembly Hall, U. of Il. on 1973-02-22"],["24-02-1973","Grateful Dead Live at University of Iowa on 1973-02-24"],["26-02-1973","Grateful Dead Live at Pershing Municipal Auditorium on 1973-02-26"],["28-02-1973","Grateful Dead Live at Salt Palace on 1973-02-28"],["15-03-1973","Grateful Dead Live at Nassau Coliseum on 1973-03-15"],["16-03-1973","Grateful Dead Live at Nassau Coliseum on 1973-03-16"],["19-03-1973","Grateful Dead Live at Nassau Coliseum on 1973-03-19"],["21-03-1973","Grateful Dead Live at Utica Memorial Auditorium on 1973-03-21"],["22-03-1973","Grateful Dead Live at Utica Memorial Auditorium on 1973-03-22"],["24-03-1973","Grateful Dead Live at The Spectrum on 1973-03-24"],["26-03-1973","Grateful Dead Live at Baltimore Civic Center on 1973-03-26"],["28-03-1973","Grateful Dead Live at Springfield Civic Center on 1973-03-28"],["30-03-1973","Grateful Dead Live at Rochester Community War Memorial on 1973-03-30"],["31-03-1973","Grateful Dead Live at War Memorial on 1973-03-31"],["02-04-1973","Grateful Dead Live at Boston Garden on 1973-04-02"],["13-05-1973","Grateful Dead Live at Des Moines State Fairgrounds on 1973-05-13"],["20-05-1973","Grateful Dead Live at Stadium, U.C Santa Barbara on 1973-05-20"],["26-05-1973","Grateful Dead Live at Kezar Stadium on 1973-05-26"],["09-06-1973","Grateful Dead Live at RFK Stadium on 1973-06-09"],["10-06-1973","Grateful Dead Live at RFK Stadium on 1973-06-10"],["22-06-1973","Grateful Dead Live at P.N.E. Coliseum on 1973-06-22"],["24-06-1973","Grateful Dead Live at Memorial Coliseum on 1973-06-24"],["26-06-1973","Grateful Dead Live at Seattle Center Arena on 1973-06-26"],["29-06-1973","Grateful Dead Live at Universal Amphitheatre on 1973-06-29"],["30-06-1973","Grateful Dead Live at Universal Amphitheatre on 1973-06-30"],["01-07-1973","Grateful Dead Live at Universal Amphitheatre on 1973-07-01"],["27-07-1973","Grateful Dead Live at Grand Prix Racecourse on 1973-07-27"],["28-07-1973","Grateful Dead Live at Grand Prix Racecourse on 1973-07-28"],["31-07-1973","Grateful Dead Live at Roosevelt Stadium on 1973-07-31"],["01-08-1973","Grateful Dead Live at Roosevelt Stadium on 1973-08-01"],["07-09-1973","Grateful Dead Live at Nassau Coliseum on 1973-09-07"],["08-09-1973","Grateful Dead Live at Nassau Coliseum on 1973-09-08"],["11-09-1973","Grateful Dead Live at William and Mary College Hall on 1973-09-11"],["12-09-1973","Grateful Dead Live at William and Mary College Hall on 1973-09-12"],["15-09-1973","Grateful Dead Live at Providence Civic Center on 1973-09-15"],["17-09-1973","Grateful Dead Live at Onondaga County War Memorial on 1973-09-17"],["20-09-1973","Grateful Dead Live at The Spectrum on 1973-09-20"],["21-09-1973","Grateful Dead Live at The Spectrum on 1973-09-21"],["24-09-1973","Grateful Dead Live at Civic Arena on 1973-09-24"],["26-09-1973","Grateful Dead Live at War Memorial on 1973-09-26"],["30-09-1973","Grateful Dead Live at Rochester Community War Memorial on 1973-09-30"],["19-10-1973","Grateful Dead Live at Oklahoma City Fairgrounds Arena on 1973-10-19"],["21-10-1973","Grateful Dead Live at Omaha Civic Auditorium on 1973-10-21"],["23-10-1973","Grateful Dead Live at Metropolitan Sports Center on 1973-10-23"],["25-10-1973","The Grateful Dead - Insane Edition"],["27-10-1973","Grateful Dead Live at Indianapolis State Fair Coliseum on 1973-10-27"],["29-10-1973","Grateful Dead Live at Kiel Auditorium on 1973-10-29"],["30-10-1973","Grateful Dead Live at Kiel Auditorium on 1973-10-30"],["01-11-1973","Grateful Dead Live at McGaw Memorial Hall, Northwestern U. on 1973-11-01"],["09-11-1973","Grateful Dead Live at Winterland Arena on 1973-11-09"],["10-11-1973","Grateful Dead Live at Winterland Arena on 1973-11-10"],["11-11-1973","Grateful Dead Live at Winterland Arena on 1973-11-11"],["14-11-1973","Grateful Dead Live at San Diego Sports Arena on 1973-11-14"],["17-11-1973","Grateful Dead Live at Pauley Pavilion, UCLA on 1973-11-17"],["20-11-1973","Grateful Dead Live at Denver Coliseum on 1973-11-20"],["21-11-1973","Grateful Dead Live at Denver Coliseum on 1973-11-21"],["23-11-1973","Grateful Dead Live at County Coliseum on 1973-11-23"],["25-11-1973","Grateful Dead Live at Feyline Field on 1973-11-25"],["28-11-1973","Grateful Dead Live at Palace of Fine Arts on 1973-11-28"],["30-11-1973","Grateful Dead Live at Boston Music Hall on 1973-11-30"],["01-12-1973","Grateful Dead Live at Boston Music Hall on 1973-12-01"],["02-12-1973","The Grateful Dead - Insane Edition"],["04-12-1973","Grateful Dead Live at Cincinnati Gardens on 1973-12-04"],["06-12-1973","Grateful Dead Live at Public Hall on 1973-12-06"],["08-12-1973","The Grateful Dead - Insane Edition"],["10-12-1973","Grateful Dead Live at Charlotte Coliseum on 1973-12-10"],["12-12-1973","Grateful Dead Live at The Omni on 1973-12-12"],["18-12-1973","Grateful Dead Live at Curtis Hixon Convention Hall on 1973-12-18"],["19-12-1973","The Grateful Dead - Insane Edition"],["22-02-1974","Grateful Dead Live at Winterland Arena on 1974-02-22"],["23-02-1974","Grateful Dead Live at Winterland Arena on 1974-02-23"],["24-02-1974","Grateful Dead Live at Winterland Arena on 1974-02-24"],["01-03-1974","Grateful Dead Live at Mars Hotel Outtakes on 1974-03-01"],["23-03-1974","Grateful Dead Live at Cow Palace on 1974-03-23"],["12-05-1974","Grateful Dead Live at University of Nevada on 1974-05-12"],["14-05-1974","Grateful Dead Live at Adams Field House, U of Montana on 1974-05-14"],["17-05-1974","Grateful Dead Live at P.N.E. Coliseum on 1974-05-17"],["19-05-1974","Grateful Dead Live at Memorial Coliseum on 1974-05-19"],["21-05-1974","Grateful Dead Live at Edmundson Pavilion, U of Washington on 1974-05-21"],["25-05-1974","Grateful Dead Live at Campus Stadium, UC Santa Barbara on 1974-05-25"],["08-06-1974","Grateful Dead Live at Oakland-Alameda County Coliseum on 1974-06-08"],["16-06-1974","Grateful Dead Live at Des Moines State Fair Grandstand on 1974-06-16"],["18-06-1974","Grateful Dead Live at Freedom Hall on 1974-06-18"],["20-06-1974","Grateful Dead Live at The Omni on 1974-06-20"],["22-06-1974","Grateful Dead Live at Jai-Alai Fronton on 1974-06-22"],["23-06-1974","Grateful Dead Live at Jai-Alai Fronton on 1974-06-23"],["26-06-1974","Grateful Dead Live at Providence Civic Center on 1974-06-26"],["28-06-1974","Grateful Dead Live at Boston Garden on 1974-06-28"],["30-06-1974","Grateful Dead Live at Springfield Civic Center on 1974-06-30"],["19-07-1974","Grateful Dead Live at Selland Arena on 1974-07-19"],["21-07-1974","Grateful Dead Live at Hollywood Bowl on 1974-07-21"],["25-07-1974","Grateful Dead Live at International Amphitheater on 1974-07-25"],["27-07-1974","Grateful Dead Live at Roanoke Civic Center on 1974-07-27"],["29-07-1974","Grateful Dead Live at Capitol Centre on 1974-07-29"],["31-07-1974","Grateful Dead Live at Dillon Stadium on 1974-07-31"],["04-08-1974","Grateful Dead Live at Philadelphia Civic Arena on 1974-08-04"],["05-08-1974","Grateful Dead Live at Philadelphia Civic Arena on 1974-08-05"],["06-08-1974","Grateful Dead Live at Roosevelt Stadium on 1974-08-06"],["09-09-1974","Grateful Dead Live at Alexandra Palace on 1974-09-09"],["10-09-1974","Grateful Dead Live at Alexandra Palace on 1974-09-10"],["11-09-1974","Grateful Dead Live at Alexandra Palace on 1974-09-11"],["14-09-1974","Grateful Dead Live at Olympia Halle on 1974-09-14"],["18-09-1974","Grateful Dead Live at Parc des Expositions on 1974-09-18"],["20-09-1974","Grateful Dead Live at Palais Des Sports on 1974-09-20"],["21-09-1974","Grateful Dead Live at Palais Des Sports on 1974-09-21"],["16-10-1974","Grateful Dead Live at Winterland Arena on 1974-10-16"],["17-10-1974","Grateful Dead Live at Winterland Arena on 1974-10-17"],["18-10-1974","Grateful Dead Live at Winterland Arena on 1974-10-18"],["19-10-1974","Grateful Dead Live at Winterland Arena on 1974-10-19"],["20-10-1974","Grateful Dead Live at Winterland Arena on 1974-10-20"],["28-02-1975","Grateful Dead Live at Bob Weir's Studio on 1975-02-28"],["01-03-1975","Grateful Dead Live at Bob Weir's Studio on 1975-03-01"],["12-03-1975","Grateful Dead Live at Ace's Studio on 1975-03-12"],["17-03-1975","Grateful Dead Live at Ace's on 1975-03-17"],["21-03-1975","Grateful Dead Live at Ace's studio on 1975-03-21"],["23-03-1975","Grateful Dead Live at Kezar Stadium on 1975-03-23"],["26-03-1975","Grateful Dead Live at Ace's on 1975-03-26"],["01-04-1975","Grateful Dead Live at Ace's Studio on 1975-04-01"],["02-04-1975","Grateful Dead Live at Ace's Studio on 1975-04-02"],["17-04-1975","Grateful Dead Live at Ace's Studio on 1975-04-17"],["03-06-1975","Grateful Dead Live at Ace's Studio on 1975-06-03"],["04-06-1975","Grateful Dead Live at Ace's Studio on 1975-06-04"],["05-06-1975","Grateful Dead Live at Club Front on 1975-06-05"],["07-06-1975","Grateful Dead Live at Bob Weir's Studio on 1975-06-07"],["17-06-1975","Grateful Dead Live at Winterland Arena on 1975-06-17"],["07-07-1975","Grateful Dead Live at Ace's Studio on 1975-07-07"],["23-07-1975","Grateful Dead Live at Club Front Studio on 1975-07-23"],["24-07-1975","Grateful Dead Live at Club Front Studio on 1975-07-24"],["13-08-1975","Grateful Dead Live at Great American Music Hall on 1975-08-13"],["01-09-1975","Grateful Dead Live at Club Front Studio on 1975-09-01"],["16-09-1975","Grateful Dead Live at Club Front Studio on 1975-09-16"],["28-09-1975","Grateful Dead Live at Lindley Meadows, Golden Gate Park on 1975-09-28"],["20-04-1976","Grateful Dead Live at Mickey's Barn on 1976-04-20"],["28-05-1976","Grateful Dead Live at Le Club Front Studios on 1976-05-28"],["03-06-1976","Grateful Dead Live at Paramount Theatre on 1976-06-03"],["04-06-1976","Grateful Dead Live at on 1976-06-04"],["09-06-1976","Grateful Dead Live at Boston Music Hall on 1976-06-09"],["10-06-1976","Grateful Dead Live at Boston Music Hall on 1976-06-10"],["11-06-1976","Grateful Dead Live at Boston Music Hall on 1976-06-11"],["12-06-1976","Grateful Dead Live at Boston Music Hall on 1976-06-12"],["14-06-1976","Grateful Dead Live at Beacon Theatre on 1976-06-14"],["15-06-1976","Grateful Dead Live at Beacon Theatre on 1976-06-15"],["17-06-1976","Grateful Dead Live at Capitol Theater on 1976-06-17"],["18-06-1976","Grateful Dead Live at Capitol Theatre on 1976-06-18"],["19-06-1976","1976-06-19 - Grateful Dead - Capitol Theatre, Passaic, NJ"],["21-06-1976","Grateful Dead Live at Tower Theatre on 1976-06-21"],["22-06-1976","Grateful Dead Live at Tower Theatre on 1976-06-22"],["23-06-1976","Grateful Dead Live at Tower Theatre on 1976-06-23"],["24-06-1976","Grateful Dead Live at Tower Theatre on 1976-06-24"],["26-06-1976","Grateful Dead Live at Auditorium Theatre on 1976-06-26"],["27-06-1976","Grateful Dead Live at Auditorium Theatre on 1976-06-27"],["28-06-1976","Grateful Dead Live at Auditorium Theatre on 1976-06-28"],["29-06-1976","Grateful Dead Live at Auditorium Theatre on 1976-06-29"],["12-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-12"],["13-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-13"],["14-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-14"],["16-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-16"],["17-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-17"],["18-07-1976","Grateful Dead Live at Orpheum Theatre on 1976-07-18"],["02-08-1976","Grateful Dead Live at Colt Park on 1976-08-02"],["04-08-1976","Grateful Dead Live at Roosevelt Stadium on 1976-08-04"],["26-08-1976","Grateful Dead Live at Club Front Studio on 1976-08-26"],["23-09-1976","Grateful Dead Live at Cameron Indoor Stadium, Duke U on 1976-09-23"],["24-09-1976","Grateful Dead Live at William and Mary College Hall on 1976-09-24"],["25-09-1976","Grateful Dead Live at Capital Centre on 1976-09-25"],["27-09-1976","Grateful Dead Live at Community War Memorial Auditorium on 1976-09-27"],["28-09-1976","Grateful Dead Live at Onondaga County War Memorial on 1976-09-28"],["30-09-1976","Grateful Dead Live at Mershon Auditorium, OSU on 1976-09-30"],["01-10-1976","Grateful Dead Live at Market Square Arena on 1976-10-01"],["02-10-1976","Grateful Dead Live at Riverfront Arena on 1976-10-02"],["03-10-1976","Grateful Dead Live at Cobo Arena on 1976-10-03"],["09-10-1976","Grateful Dead Live at Oakland-Alameda County Coliseum on 1976-10-09"],["10-10-1976","Grateful Dead Live at Oakland-Alameda County Coliseum on 1976-10-10"],["14-10-1976","Grateful Dead Live at Shrine Auditorium on 1976-10-14"],["15-10-1976","Grateful Dead Live at Shrine Auditorium on 1976-10-15"],["31-12-1976","Grateful Dead Live at Cow Palace on 1976-12-31"],["17-02-1977","Grateful Dead Live at Arista Studios on 1977-02-17"],["20-02-1977","Grateful Dead Live at Studio (Terrapin Station Outtakes) on 1977-02-20"],["26-02-1977","Grateful Dead Live at Swing Auditorium on 1977-02-26"],["27-02-1977","Grateful Dead Live at Robertson Gym University Of California on 1977-02-27"],["01-03-1977","Grateful Dead Live at Multiple on 1977-03-01"],["18-03-1977","Grateful Dead Live at Winterland Arena on 1977-03-18"],["19-03-1977","Grateful Dead Live at Winterland Arena on 1977-03-19"],["20-03-1977","Grateful Dead Live at Winterland Arena on 1977-03-20"],["22-04-1977","Grateful Dead Live at The Spectrum on 1977-04-22"],["23-04-1977","Grateful Dead Live at Springfield Civic Center Arena on 1977-04-23"],["25-04-1977","Grateful Dead Live at Capitol Theater on 1977-04-25"],["26-04-1977","Grateful Dead Live at Capitol Theater on 1977-04-26"],["27-04-1977","Grateful Dead Live at Capitol Theater on 1977-04-27"],["29-04-1977","Grateful Dead Live at The Palladium on 1977-04-29"],["30-04-1977","Grateful Dead Live at The Palladium on 1977-04-30"],["01-05-1977","Grateful Dead Live at The Palladium on 1977-05-01"],["03-05-1977","Grateful Dead Live at The Palladium on 1977-05-03"],["04-05-1977","Grateful Dead Live at The Palladium on 1977-05-04"],["05-05-1977","Grateful Dead Live at New Haven Coliseum on 1977-05-05"],["07-05-1977","Grateful Dead Live at Boston Garden on 1977-05-07"],["08-05-1977","Grateful Dead Live at Barton Hall - Cornell University on 1977-05-08"],["09-05-1977","Grateful Dead Live at War Memorial on 1977-05-09"],["11-05-1977","Grateful Dead Live at St. Paul Civic Center on 1977-05-11"],["12-05-1977","Grateful Dead Live at Auditorium Theatre on 1977-05-12"],["13-05-1977","Grateful Dead Live at Auditorium Theatre on 1977-05-13"],["15-05-1977","Grateful Dead Live at St. Louis Arena on 1977-05-15"],["17-05-1977","Grateful Dead Live at Memorial Coliseum on 1977-05-17"],["18-05-1977","Grateful Dead Live at Fox Theater on 1977-05-18"],["19-05-1977","Grateful Dead Live at Fox Theatre on 1977-05-19"],["21-05-1977","Grateful Dead Live at Lakeland Civic Center on 1977-05-21"],["22-05-1977","Grateful Dead Live at The Sportatorium on 1977-05-22"],["25-05-1977","Grateful Dead Live at Mosque on 1977-05-25"],["26-05-1977","Grateful Dead Live at Baltimore Civic Center on 1977-05-26"],["28-05-1977","Grateful Dead Live at Hartford Civic Center on 1977-05-28"],["04-06-1977","Grateful Dead Live at The Forum on 1977-06-04"],["07-06-1977","Grateful Dead Live at Winterland Arena on 1977-06-07"],["08-06-1977","Grateful Dead Live at Winterland Arena on 1977-06-08"],["09-06-1977","Grateful Dead Live at Winterland Arena on 1977-06-09"],["03-09-1977","Grateful Dead"],["28-09-1977","Grateful Dead Live at Paramount Northwest Theater on 1977-09-28"],["29-09-1977","Grateful Dead Live at Paramount Northwest Theater on 1977-09-29"],["01-10-1977","Grateful Dead Live at Paramount Theater on 1977-10-01"],["02-10-1977","Grateful Dead Live at Paramount Theater on 1977-10-02"],["06-10-1977","Grateful Dead Live at Activity Center, Arizona State University on 1977-10-06"],["07-10-1977","Grateful Dead Live at University of New Mexico on 1977-10-07"],["09-10-1977","Grateful Dead Live at McNichols Arena on 1977-10-09"],["11-10-1977","Grateful Dead Live at Lloyd Noble Center - University of Oklahoma on 1977-10-11"],["12-10-1977","Grateful Dead Live at Manor Downs on 1977-10-12"],["14-10-1977","Grateful Dead Live at Hofheinz Pavilion on 1977-10-14"],["15-10-1977","Grateful Dead Live at Moody Coliseum, S.M.U on 1977-10-15"],["16-10-1977","Grateful Dead Live at Louisiana State U on 1977-10-16"],["28-10-1977","Grateful Dead Live at Soldiers' and Sailors' Memorial Hall on 1977-10-28"],["29-10-1977","Grateful Dead Live at Field House, Northern Illinois U on 1977-10-29"],["30-10-1977","Grateful Dead Live at Assembly Hall, Ind on 1977-10-30"],["01-11-1977","Grateful Dead Live at Cobo Arena on 1977-11-01"],["02-11-1977","Grateful Dead Live at Field House - Seneca College on 1977-11-02"],["04-11-1977","Grateful Dead Live at Cotterrell Gym, Colgate U on 1977-11-04"],["05-11-1977","Grateful Dead"],["06-11-1977","Grateful Dead Live at Broome County Arena on 1977-11-06"],["27-12-1977","Grateful Dead Live at Winterland Arena on 1977-12-27"],["29-12-1977","Grateful Dead Live at Winterland Arena on 1977-12-29"],["30-12-1977","Grateful Dead Live at Winterland Arena on 1977-12-30"],["31-12-1977","Grateful Dead Live at Winterland Arena on 1977-12-31"],["06-01-1978","Grateful Dead Live at Swing Auditorium on 1978-01-06"],["07-01-1978","Grateful Dead Live at Golden Hall on 1978-01-07"],["08-01-1978","Grateful Dead Live at Golden Hall, Community Concourse on 1978-01-08"],["10-01-1978","Grateful Dead Live at Shrine Auditorium on 1978-01-10"],["11-01-1978","Grateful Dead Live at Shrine Auditorium on 1978-01-11"],["13-01-1978","Grateful Dead Live at Arlington Theater on 1978-01-13"],["14-01-1978","Grateful Dead Live at Bakersfield Memorial Auditorium on 1978-01-14"],["15-01-1978","Grateful Dead Live at Selland Arena on 1978-01-15"],["17-01-1978","Grateful Dead Live at Sacramento Memorial Auditorium on 1978-01-17"],["18-01-1978","Grateful Dead Live at Stockton Civic Auditorium on 1978-01-18"],["22-01-1978","Grateful Dead Live at McArthur Court, U of Oregon on 1978-01-22"],["30-01-1978","Grateful Dead Live at Uptown Theater on 1978-01-30"],["31-01-1978","Grateful Dead Live at Uptown Theater on 1978-01-31"],["01-02-1978","Grateful Dead Live at Uptown Theater on 1978-02-01"],["03-02-1978","Grateful Dead Live at Dane County Coliseum on 1978-02-03"],["04-02-1978","Grateful Dead Live at Milwaukee Auditorium on 1978-02-04"],["05-02-1978","Grateful Dead Live at Uni Dome, U of Northern Iowa on 1978-02-05"],["06-04-1978","Grateful Dead Live at Curtis Hixon Convention Hall on 1978-04-06"],["07-04-1978","Grateful Dead Live at The Sportatorium on 1978-04-07"],["08-04-1978","Grateful Dead Live at Veteran's Memorial Coliseum on 1978-04-08"],["10-04-1978","Grateful Dead Live at Fox Theater on 1978-04-10"],["11-04-1978","Grateful Dead Live at Fox Theater on 1978-04-11"],["12-04-1978","Grateful Dead Live at Cameron Indoor Stadium, Duke U on 1978-04-12"],["14-04-1978","Grateful Dead Live at Coliseum, Virginia Polytechnic U on 1978-04-14"],["15-04-1978","Grateful Dead Live at William and Mary College Hall on 1978-04-15"],["16-04-1978","Grateful Dead Live at Huntington Civic Center on 1978-04-16"],["18-04-1978","Grateful Dead Live at Civic Arena on 1978-04-18"],["19-04-1978","Grateful Dead Live at Veterans' Memorial Hall on 1978-04-19"],["21-04-1978","Grateful Dead Live at Rupp Arena on 1978-04-21"],["22-04-1978","Grateful Dead Live at Nashville Municipal Auditorium on 1978-04-22"],["24-04-1978","Grateful Dead Live at Horton Field House, Illinois State U. on 1978-04-24"],["05-05-1978","Grateful Dead Live at Thompson Arena, Dartmouth College on 1978-05-05"],["06-05-1978","Grateful Dead Live at Patrick Gymnasium - University of Vermont on 1978-05-06"],["07-05-1978","Grateful Dead Live at Field House, Rensselaer Polytechnic Institute on 1978-05-07"],["09-05-1978","Grateful Dead Live at Onongada County War Memorial on 1978-05-09"],["10-05-1978","Grateful Dead Live at Veterans' Memorial Coliseum on 1978-05-10"],["11-05-1978","Grateful Dead Live at Springfield Civic Center on 1978-05-11"],["13-05-1978","Grateful Dead Live at The Spectrum on 1978-05-13"],["14-05-1978","Grateful Dead Live at Providence Civic Center on 1978-05-14"],["16-05-1978","Grateful Dead Live at Uptown Theater on 1978-05-16"],["17-05-1978","Grateful Dead Live at Uptown Theater on 1978-05-17"],["04-06-1978","Grateful Dead Live at Campus Stadium, UC Santa Barbara on 1978-06-04"],["25-06-1978","Grateful Dead Live at Autzen Stadium, U. of Oregon on 1978-06-25"],["01-07-1978","Grateful Dead Live at Arrowhead Stadium on 1978-07-01"],["03-07-1978","Grateful Dead Live at St. Paul Civic Center on 1978-07-03"],["05-07-1978","Grateful Dead Live at Omaha Civic Auditorium on 1978-07-05"],["07-07-1978","Grateful Dead Live at Red Rocks Amphitheatre on 1978-07-07"],["08-07-1978","Grateful Dead Live at Red Rocks Amphitheatre on 1978-07-08"],["18-08-1978","Grateful Dead Live at Studio on 1978-08-18"],["30-08-1978","Grateful Dead Live at Red Rocks Amphitheatre on 1978-08-30"],["31-08-1978","Grateful Dead Live at Red Rocks Amphitheatre on 1978-08-31"],["02-09-1978","Grateful Dead Live at Giants Stadium on 1978-09-02"],["13-09-1978","Grateful Dead Live at Gizah Sound and Light Theater on 1978-09-13"],["14-09-1978","Grateful Dead Live at Sphinx Theatre on 1978-09-14"],["15-09-1978","Grateful Dead Live at Sphinx Theatre on 1978-09-15"],["16-09-1978","Grateful Dead Live at Sphinx Theatre on 1978-09-16"],["17-10-1978","Grateful Dead Live at Winterland Arena on 1978-10-17"],["18-10-1978","Grateful Dead Live at Winterland Arena on 1978-10-18"],["20-10-1978","Grateful Dead Live at Winterland Arena on 1978-10-20"],["21-10-1978","Grateful Dead Live at Winterland Arena on 1978-10-21"],["22-10-1978","Grateful Dead Live at Winterland Arena on 1978-10-22"],["13-11-1978","Grateful Dead Live at Boston Music Hall on 1978-11-13"],["14-11-1978","Grateful Dead Live at Boston Music Hall on 1978-11-14"],["16-11-1978","Grateful Dead Live at Uptown Theater on 1978-11-16"],["17-11-1978","Grateful Dead Live at Uptown Theatre on 1978-11-17"],["18-11-1978","Grateful Dead Live at Uptown Theater on 1978-11-18"],["20-11-1978","Grateful Dead Live at Cleveland Music Hall on 1978-11-20"],["21-11-1978","Grateful Dead Live at Community War Memorial Auditorium on 1978-11-21"],["23-11-1978","Grateful Dead Live at Capital Centre on 1978-11-23"],["24-11-1978","Grateful Dead Live at Capitol Theater on 1978-11-24"],["25-11-1978","Grateful Dead Live at Veterans Coliseum on 1978-11-25"],["12-12-1978","Grateful Dead Live at Jai-Alai Fronton on 1978-12-12"],["13-12-1978","Grateful Dead Live at Curtis Hixon Convention Hall on 1978-12-13"],["15-12-1978","Grateful Dead Live at Boutwell Auditorium on 1978-12-15"],["16-12-1978","Grateful Dead Live at Nashville Municipal Auditorium on 1978-12-16"],["17-12-1978","Grateful Dead Live at Fox Theater on 1978-12-17"],["19-12-1978","Grateful Dead Live at State Fairgrounds Coliseum on 1978-12-19"],["21-12-1978","Grateful Dead Live at The Summit on 1978-12-21"],["22-12-1978","Grateful Dead Live at Dallas County Convention Center Arena on 1978-12-22"],["27-12-1978","Grateful Dead Live at Golden Hall, Community Concourse on 1978-12-27"],["28-12-1978","Grateful Dead Live at Golden Hall, Community Concorse on 1978-12-28"],["30-12-1978","Grateful Dead Live at Pauley Pavilion, UCLA on 1978-12-30"],["31-12-1978","Grateful Dead Live at Winterland Arena on 1978-12-31"],["05-01-1979","Grateful Dead Live at The Spectrum on 1979-01-05"],["07-01-1979","Grateful Dead Live at Madison Square Garden on 1979-01-07"],["08-01-1979","Grateful Dead Live at Madison Square Garden on 1979-01-08"],["10-01-1979","Grateful Dead Live at Nassau Coliseum on 1979-01-10"],["11-01-1979","Grateful Dead Live at Nassau Coliseum on 1979-01-11"],["12-01-1979","Grateful Dead Live at The Spectrum on 1979-01-12"],["14-01-1979","Grateful Dead Live at Utica Memorial Coliseum on 1979-01-14"],["15-01-1979","Grateful Dead Live at Springfield Civic Center on 1979-01-15"],["17-01-1979","Grateful Dead Live at New Haven Coliseum on 1979-01-17"],["18-01-1979","Grateful Dead Live at Providence Civic Center on 1979-01-18"],["20-01-1979","Grateful Dead Live at Shea's Theater on 1979-01-20"],["21-01-1979","Grateful Dead Live at Masonic Temple on 1979-01-21"],["03-02-1979","Grateful Dead Live at Market Square Arena on 1979-02-03"],["04-02-1979","Grateful Dead Live at Dane County Coliseum on 1979-02-04"],["07-02-1979","Grateful Dead Live at SIU Arena, U of Southern Illinois on 1979-02-07"],["09-02-1979","Grateful Dead Live at Soldiers' and Sailors' Memorial Hall on 1979-02-09"],["10-02-1979","Grateful Dead Live at Soldiers' and Sailors' Memorial Hall on 1979-02-10"],["11-02-1979","Grateful Dead Live at Kiel Auditorium on 1979-02-11"],["17-02-1979","Grateful Dead Live at Oakland-Alameda County Coliseum on 1979-02-17"],["16-04-1979","Grateful Dead Live at Studio Rehersal, Club Front on 1979-04-16"],["22-04-1979","Grateful Dead Live at Spartan Stadium, San Jose State on 1979-04-22"],["03-05-1979","Grateful Dead Live at Charlotte Coliseum on 1979-05-03"],["04-05-1979","Grateful Dead Live at Hampton Coliseum on 1979-05-04"],["05-05-1979","Grateful Dead Live at Baltimore Civic Center on 1979-05-05"],["07-05-1979","Grateful Dead Live at Allan Kirby Field House on 1979-05-07"],["08-05-1979","Grateful Dead Live at Rec Hall, Penn State U on 1979-05-08"],["09-05-1979","Grateful Dead Live at Broome County Arena on 1979-05-09"],["11-05-1979","Grateful Dead Live at Billerica Forum on 1979-05-11"],["12-05-1979","Grateful Dead Live at Alumni Stadium, U. Mass. on 1979-05-12"],["13-05-1979","Grateful Dead Live at Cumberland County Civic Center on 1979-05-13"],["28-06-1979","Grateful Dead Live at Sacramento Memorial Auditorium on 1979-06-28"],["30-06-1979","Grateful Dead Live at Portland International Speedway on 1979-06-30"],["01-07-1979","Grateful Dead Live at Seattle Center Coliseum on 1979-07-01"],["11-07-1979","Grateful Dead Live at Studio Rehersal, Club Front on 1979-07-11"],["04-08-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-08-04"],["05-08-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-08-05"],["12-08-1979","Grateful Dead Live at Red Rocks Amphitheatre on 1979-08-12"],["13-08-1979","Grateful Dead Live at McNichols Sports Arena on 1979-08-13"],["14-08-1979","Grateful Dead Live at McNichols Arena on 1979-08-14"],["31-08-1979","Grateful Dead Live at Glens Falls Civic Center on 1979-08-31"],["01-09-1979","Grateful Dead Live at Holleder Memorial Stadium on 1979-09-01"],["02-09-1979","Grateful Dead Live at Augusta Civic Center on 1979-09-02"],["04-09-1979","Grateful Dead Live at Madison Square Garden on 1979-09-04"],["05-09-1979","Grateful Dead Live at Madison Square Garden on 1979-09-05"],["06-09-1979","Grateful Dead Live at Madison Square Garden on 1979-09-06"],["24-10-1979","Grateful Dead Live at Springfield Civic Center on 1979-10-24"],["25-10-1979","Grateful Dead Live at Veterans' Memorial Coliseum on 1979-10-25"],["27-10-1979","Grateful Dead Live at Cape Cod Coliseum on 1979-10-27"],["28-10-1979","Grateful Dead Live at Cape Cod Coliseum on 1979-10-28"],["31-10-1979","Grateful Dead Live at Nassau Coliseum on 1979-10-31"],["01-11-1979","Grateful Dead Live at Nassau Coliseum on 1979-11-01"],["02-11-1979","Grateful Dead Live at Nassau Coliseum on 1979-11-02"],["04-11-1979","Grateful Dead Live at Civic Center on 1979-11-04"],["05-11-1979","Grateful Dead Live at The Spectrum on 1979-11-05"],["06-11-1979","Grateful Dead Live at The Spectrum on 1979-11-06"],["08-11-1979","Grateful Dead Live at Capital Centre on 1979-11-08"],["09-11-1979","Grateful Dead Live at Community War Memorial Auditorium on 1979-11-09"],["10-11-1979","Grateful Dead Live at Crisler Arena on 1979-11-10"],["23-11-1979","Grateful Dead Live at Golden Hall, Community Concourse on 1979-11-23"],["24-11-1979","Grateful Dead Live at Golden Hall, Community Concourse on 1979-11-24"],["25-11-1979","Grateful Dead Live at Pauley Pavilion, UCLA on 1979-11-25"],["29-11-1979","Grateful Dead Live at Cleveland Public Hall on 1979-11-29"],["30-11-1979","Grateful Dead Live at Stanley Theater on 1979-11-30"],["01-12-1979","Grateful Dead Live at Stanley Theater on 1979-12-01"],["03-12-1979","Grateful Dead Live at Uptown Theater on 1979-12-03"],["04-12-1979","Grateful Dead Live at Uptown Theater on 1979-12-04"],["05-12-1979","Grateful Dead Live at Uptown Theater on 1979-12-05"],["07-12-1979","Grateful Dead Live at Indiana Convention Center on 1979-12-07"],["09-12-1979","Grateful Dead Live at Kiel Auditorium on 1979-12-09"],["10-12-1979","Grateful Dead Live at Soldiers and Sailors Memorial Hall on 1979-12-10"],["11-12-1979","Grateful Dead Live at Soldiers' and Sailors' Memorial Hall on 1979-12-11"],["26-12-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-12-26"],["27-12-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-12-27"],["28-12-1979","Grateful Dead Live at Oakland Auditorium on 1979-12-28"],["29-12-1979","Grateful Dead Live at Winterland Arena on 1979-12-29"],["30-12-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-12-30"],["31-12-1979","Grateful Dead Live at Oakland Auditorium Arena on 1979-12-31"],["01-01-1980","Grateful Dead Live at Unknown on 1980-01-01"],["13-01-1980","Grateful Dead Live at Oakland-Alameda County Coliseum on 1980-01-13"],["30-03-1980","Grateful Dead Live at Capitol Theater on 1980-03-30"],["31-03-1980","Grateful Dead Live at Capitol Theater on 1980-03-31"],["01-04-1980","Grateful Dead Live at Capitol Theater on 1980-04-01"],["05-04-1980","Grateful Dead Live at NBC Studios on 1980-04-05"],["28-04-1980","Grateful Dead Live at Boutwell Auditorium on 1980-04-28"],["29-04-1980","Grateful Dead Live at Fox Theatre on 1980-04-29"],["01-05-1980","Grateful Dead Live at Greensboro Coliseum on 1980-05-01"],["02-05-1980","Grateful Dead Live at Hampton Coliseum on 1980-05-02"],["04-05-1980","Grateful Dead Live at Baltimore Civic Center on 1980-05-04"],["06-05-1980","Grateful Dead Live at Rec Hall, Penn State U on 1980-05-06"],["07-05-1980","Grateful Dead Live at Barton Hall, Cornell U on 1980-05-07"],["08-05-1980","Grateful Dead Live at Glens Falls Civic Center on 1980-05-08"],["10-05-1980","Grateful Dead Live at Hartford Civic Center on 1980-05-10"],["11-05-1980","Grateful Dead Live at Cumberland County Civic Center on 1980-05-11"],["12-05-1980","Grateful Dead Live at Boston Garden on 1980-05-12"],["14-05-1980","Grateful Dead Live at Nassau Coliseum on 1980-05-14"],["15-05-1980","Grateful Dead Live at Nassau Coliseum on 1980-05-15"],["16-05-1980","Grateful Dead Live at Nassau Coliseum on 1980-05-16"],["29-05-1980","Grateful Dead Live at Des Moines Civic Center on 1980-05-29"],["30-05-1980","Grateful Dead Live at Milwaukee Auditorium on 1980-05-30"],["31-05-1980","Grateful Dead Live at Metropolitan Sports Center on 1980-05-31"],["01-06-1980","Grateful Dead Live at Unknown on 1980-06-01"],["05-06-1980","Grateful Dead Live at Compton Terrace Amphitheatre on 1980-06-05"],["07-06-1980","Grateful Dead Live at Folsom Field on 1980-06-07"],["08-06-1980","Grateful Dead Live at Folsom Field, University of Colorado on 1980-06-08"],["12-06-1980","Grateful Dead Live at Portland Memorial Coliseum on 1980-06-12"],["13-06-1980","Grateful Dead Live at Seattle Center Coliseum on 1980-06-13"],["14-06-1980","Grateful Dead Live at Spokane Coliseum on 1980-06-14"],["19-06-1980","Grateful Dead Live at West High Auditorium on 1980-06-19"],["20-06-1980","Grateful Dead Live at West High Auditorium on 1980-06-20"],["21-06-1980","Grateful Dead Live at West High Auditorium on 1980-06-21"],["29-06-1980","Grateful Dead Live at Pauley Pavilion, UCLA on 1980-06-29"],["01-07-1980","Grateful Dead Live at San Diego Sports Arena on 1980-07-01"],["16-08-1980","Grateful Dead Live at Mississippi River Festival on 1980-08-16"],["17-08-1980","Grateful Dead Live at Kansas City Municipal Auditorium Arena on 1980-08-17"],["19-08-1980","Grateful Dead Live at Uptown Theatre on 1980-08-19"],["20-08-1980","Grateful Dead Live at Uptown Theater on 1980-08-20"],["21-08-1980","Grateful Dead Live at Uptown Theater on 1980-08-21"],["23-08-1980","Grateful Dead Live at Alpine Valley Music Theatre on 1980-08-23"],["24-08-1980","Grateful Dead Live at Grand Center on 1980-08-24"],["26-08-1980","Grateful Dead Live at Cleveland Public Hall on 1980-08-26"],["27-08-1980","Grateful Dead Live at Pine Knob Music Theater on 1980-08-27"],["29-08-1980","Grateful Dead Live at The Spectrum on 1980-08-29"],["30-08-1980","Grateful Dead Live at The Spectrum on 1980-08-30"],["31-08-1980","Grateful Dead Live at Capital Centre on 1980-08-31"],["02-09-1980","Grateful Dead Live at Community War Memorial on 1980-09-02"],["03-09-1980","Grateful Dead Live at Springfield Civic Center on 1980-09-03"],["04-09-1980","Grateful Dead"],["06-09-1980","Grateful Dead Live at Maine State Fairgrounds on 1980-09-06"],["25-09-1980","Grateful Dead Live at Warfield Theater on 1980-09-25"],["26-09-1980","Grateful Dead Live at Warfield Theater on 1980-09-26"],["27-09-1980","Grateful Dead Live at Warfield Theater on 1980-09-27"],["29-09-1980","Grateful Dead Live at Warfield Theater on 1980-09-29"],["30-09-1980","Grateful Dead Live at Warfield Theater on 1980-09-30"],["01-10-1980","Grateful Dead Live at Warfield Theatre & Radio City Music Hall on 1980-10-01"],["02-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-02"],["03-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-03"],["04-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-04"],["06-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-06"],["07-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-07"],["09-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-09"],["10-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-10"],["11-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-11"],["13-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-13"],["14-10-1980","Grateful Dead Live at Warfield Theater on 1980-10-14"],["18-10-1980","Grateful Dead Live at Saenger Performing Arts Center on 1980-10-18"],["19-10-1980","Grateful Dead Live at Saenger Performing Arts Center on 1980-10-19"],["22-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-22"],["23-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-23"],["25-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-25"],["26-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-26"],["27-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-27"],["29-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-29"],["30-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-30"],["31-10-1980","Grateful Dead Live at Radio City Music Hall on 1980-10-31"],["26-11-1980","Grateful Dead Live at The Sportatorium on 1980-11-26"],["28-11-1980","Grateful Dead Live at Lakeland Civic Center on 1980-11-28"],["29-11-1980","Grateful Dead Live at Alligator Alley Gym, University of Florida on 1980-11-29"],["30-11-1980","Grateful Dead Live at Fox Theater on 1980-11-30"],["06-12-1980","Grateful Dead Live at Mill Valley Recreation Center on 1980-12-06"],["12-12-1980","Grateful Dead Live at Swing Auditorium on 1980-12-12"],["13-12-1980","Grateful Dead Live at Long Beach Arena on 1980-12-13"],["14-12-1980","Grateful Dead Live at Long Beach Arena on 1980-12-14"],["26-12-1980","Grateful Dead Live at Oakland Auditorium Arena on 1980-12-26"],["27-12-1980","Grateful Dead Live at Oakland Auditorium Arena on 1980-12-27"],["28-12-1980","Grateful Dead Live at Oakland Auditorium Arena on 1980-12-28"],["30-12-1980","Grateful Dead Live at Oakland Auditorium on 1980-12-30"],["31-12-1980","Grateful Dead Live at Oakland Auditorium Arena on 1980-12-31"],["17-02-1981","Grateful Dead Live at Club Front on 1981-02-17"],["26-02-1981","Grateful Dead Live at Uptown Theater on 1981-02-26"],["27-02-1981","Grateful Dead Live at Uptown Theater on 1981-02-27"],["28-02-1981","Grateful Dead Live at Uptown Theater on 1981-02-28"],["02-03-1981","Grateful Dead Live at Cleveland Music Hall on 1981-03-02"],["03-03-1981","Grateful Dead Live at Cleveland Music Hall on 1981-03-03"],["04-03-1981","Grateful Dead Live at Club Front on 1981-03-04"],["05-03-1981","Grateful Dead Live at Stanley Theater on 1981-03-05"],["06-03-1981","Grateful Dead Live at Stanley Theater on 1981-03-06"],["07-03-1981","Grateful Dead Live at Cole Field House on 1981-03-07"],["09-03-1981","Grateful Dead Live at Madison Square Garden on 1981-03-09"],["10-03-1981","Grateful Dead Live at Madison Square Garden on 1981-03-10"],["12-03-1981","Grateful Dead Live at Boston Garden on 1981-03-12"],["13-03-1981","Grateful Dead Live at Utica Coliseum on 1981-03-13"],["14-03-1981","Grateful Dead Live at Veterans' Memorial Coliseum on 1981-03-14"],["20-03-1981","Grateful Dead Live at Rainbow Theater on 1981-03-20"],["21-03-1981","Grateful Dead Live at Rainbow Theater on 1981-03-21"],["23-03-1981","Grateful Dead Live at Rainbow Theater on 1981-03-23"],["24-03-1981","Grateful Dead Live at Rainbow Theater on 1981-03-24"],["28-03-1981","Grateful Dead Live at Grugahalle on 1981-03-28"],["25-04-1981","Grateful Dead Live at The Stone on 1981-04-25"],["30-04-1981","Grateful Dead Live at Greensboro Coliseum on 1981-04-30"],["01-05-1981","Grateful Dead Live at Hampton Coliseum on 1981-05-01"],["02-05-1981","Grateful Dead Live at The Spectrum on 1981-05-02"],["04-05-1981","Grateful Dead Live at The Spectrum on 1981-05-04"],["05-05-1981","Grateful Dead Live at Glens Falls Civic Center on 1981-05-05"],["06-05-1981","Grateful Dead Live at Nassau Coliseum on 1981-05-06"],["07-05-1981","Grateful Dead Live at Tommorow With Tom Snyder, NBC Studios on 1981-05-07"],["08-05-1981","Grateful Dead Live at Nassau Coliseum on 1981-05-08"],["09-05-1981","Grateful Dead Live at Nassau Coliseum on 1981-05-09"],["11-05-1981","Grateful Dead Live at Veterans' Memorial Coliseum on 1981-05-11"],["12-05-1981","Grateful Dead Live at Veterans' Memorial Coliseum on 1981-05-12"],["13-05-1981","Grateful Dead Live at Providence Civic Center on 1981-05-13"],["15-05-1981","Grateful Dead Live at Rutgers Athletic Center on 1981-05-15"],["16-05-1981","Grateful Dead Live at Barton Hall, Cornell U on 1981-05-16"],["17-05-1981","Grateful Dead Live at Onondaga Auditorium on 1981-05-17"],["22-05-1981","Grateful Dead Live at Warfield Theater on 1981-05-22"],["02-07-1981","Grateful Dead Live at The Summit on 1981-07-02"],["04-07-1981","Grateful Dead Live at Manor Downs on 1981-07-04"],["05-07-1981","Grateful Dead Live at Zoo Amphitheater on 1981-07-05"],["07-07-1981","Grateful Dead Live at Kansas City Municipal Auditorium Arena on 1981-07-07"],["08-07-1981","Grateful Dead Live at Kiel Auditorium on 1981-07-08"],["10-07-1981","Grateful Dead Live at St. Paul Civic Center Arena on 1981-07-10"],["11-07-1981","Grateful Dead Live at Alpine Valley Music Theatre on 1981-07-11"],["13-07-1981","Grateful Dead Live at McNichols Sports Arena on 1981-07-13"],["14-07-1981","Grateful Dead Live at McNichols Sports Arena on 1981-07-14"],["06-08-1981","Grateful Dead Live at McArthur Court, University Of Oregon on 1981-08-06"],["12-08-1981","Grateful Dead Live at Salt Palace on 1981-08-12"],["14-08-1981","Grateful Dead Live at Seattle Center Coliseum on 1981-08-14"],["15-08-1981","Grateful Dead Live at Portland Memorial Coliseum on 1981-08-15"],["16-08-1981","Grateful Dead Live at MacArthur Court, U of Oregon on 1981-08-16"],["27-08-1981","Grateful Dead Live at Long Beach Arena on 1981-08-27"],["28-08-1981","Grateful Dead Live at Long Beach Arena on 1981-08-28"],["30-08-1981","Grateful Dead Live at Compton Terrace Amphitheatre on 1981-08-30"],["31-08-1981","Grateful Dead Live at Aladdin Theater on 1981-08-31"],["11-09-1981","Grateful Dead Live at Greek Theater on 1981-09-11"],["12-09-1981","Grateful Dead Live at Greek Theater on 1981-09-12"],["13-09-1981","Grateful Dead Live at Greek Theatre - University of California on 1981-09-13"],["25-09-1981","Grateful Dead Live at Stabler Arena, Lehigh U on 1981-09-25"],["26-09-1981","Grateful Dead Live at Buffalo Auditorium on 1981-09-26"],["27-09-1981","Grateful Dead Live at Capital Centre on 1981-09-27"],["30-09-1981","Grateful Dead Live at Playhouse Theater on 1981-09-30"],["02-10-1981","Grateful Dead Live at Rainbow Theater on 1981-10-02"],["03-10-1981","Grateful Dead Live at Rainbow Theater on 1981-10-03"],["04-10-1981","Grateful Dead Live at Rainbow Theater on 1981-10-04"],["06-10-1981","Grateful Dead Live at Rainbow Theater on 1981-10-06"],["08-10-1981","Grateful Dead Live at the Forum. Copenhagen 1981-10-08"],["10-10-1981","Grateful Dead Live at StadtHalle on 1981-10-10"],["11-10-1981","Grateful Dead Live at Melk Weg on 1981-10-11"],["12-10-1981","Grateful Dead Live at Olympia Halle on 1981-10-12"],["13-10-1981","Grateful Dead Live at Walter Koebel Halle on 1981-10-13"],["15-10-1981","Grateful Dead Live at Club Melk Weg on 1981-10-15"],["16-10-1981","Grateful Dead Live at Melkweg on 1981-10-16"],["17-10-1981","Grateful Dead Live at The Hippodrome on 1981-10-17"],["19-10-1981","Grateful Dead Live at Sports Palace on 1981-10-19"],["11-11-1981","Grateful Dead Live at Meadowlands Arena on 1981-11-11"],["29-11-1981","Grateful Dead Live at Civic Arena on 1981-11-29"],["30-11-1981","Grateful Dead Live at Hara Arena on 1981-11-30"],["02-12-1981","Grateful Dead Live at Assembly Hall on 1981-12-02"],["03-12-1981","Grateful Dead Live at Dane County Coliseum on 1981-12-03"],["05-12-1981","Grateful Dead Live at Market Square Arena on 1981-12-05"],["06-12-1981","Grateful Dead Live at Rosemont Horizon Arena on 1981-12-06"],["07-12-1981","Grateful Dead Live at Des Moines Civic Center on 1981-12-07"],["09-12-1981","Grateful Dead Live at Activity Center - University of Colorado on 1981-12-09"],["12-12-1981","Grateful Dead Live at Fiesta Hall, San Mateo County Fairgrounds on 1981-12-12"],["26-12-1981","Grateful Dead Live at Oakland Auditorium Arena on 1981-12-26"],["27-12-1981","Grateful Dead Live at Oakland Auditorium on 1981-12-27"],["28-12-1981","Grateful Dead Live at Oakland Auditorium Arena on 1981-12-28"],["30-12-1981","Grateful Dead Live at Oakland Auditorium on 1981-12-30"],["31-12-1981","Grateful Dead Live at Oakland Auditorium Arena on 1981-12-31"],["01-01-1982","Grateful Dead Live at Mickey's ranch studio on 1982-01-01"],["16-02-1982","Grateful Dead Live at Warfield Theater on 1982-02-16"],["17-02-1982","Grateful Dead Live at Warfield Theater on 1982-02-17"],["19-02-1982","Grateful Dead Live at Golden Hall, Community Concourse on 1982-02-19"],["20-02-1982","Grateful Dead Live at Golden Hall, Community Concourse on 1982-02-20"],["21-02-1982","Grateful Dead Live at Pauley Pavilion, UCLA on 1982-02-21"],["13-03-1982","Grateful Dead Live at Reno Centennial Coliseum on 1982-03-13"],["14-03-1982","Grateful Dead Live at Recreation Hall, UC Davis on 1982-03-14"],["02-04-1982","Grateful Dead Live at Cameron Indoor Stadium, Duke U on 1982-04-02"],["03-04-1982","Grateful Dead Live at The Scope on 1982-04-03"],["05-04-1982","Grateful Dead Live at The Spectrum on 1982-04-05"],["06-04-1982","Grateful Dead Live at The Spectrum on 1982-04-06"],["08-04-1982","Grateful Dead Live at Onondaga Auditorium on 1982-04-08"],["09-04-1982","Grateful Dead Live at War Memorial Auditorium on 1982-04-09"],["11-04-1982","Grateful Dead Live at Nassau Coliseum on 1982-04-11"],["12-04-1982","Grateful Dead Live at Nassau Coliseum on 1982-04-12"],["14-04-1982","Grateful Dead Live at Glens Falls Civic Center on 1982-04-14"],["15-04-1982","Grateful Dead Live at Providence Civic Center on 1982-04-15"],["17-04-1982","Grateful Dead Live at Hartford Civic Center on 1982-04-17"],["18-04-1982","Grateful Dead Live at Hartford Civic Center on 1982-04-18"],["19-04-1982","Grateful Dead Live at Baltimore Civic Center on 1982-04-19"],["21-05-1982","Grateful Dead Live at Greek Theatre, U. Of California on 1982-05-21"],["22-05-1982","Grateful Dead Live at Greek Theatre - University of California on 1982-05-22"],["23-05-1982","Grateful Dead Live at Greek Theatre, U. Of California on 1982-05-23"],["28-05-1982","Grateful Dead Live at Moscone Convention Center on 1982-05-28"],["17-07-1982","Grateful Dead Live at Ventura County Fairgrounds on 1982-07-17"],["18-07-1982","Grateful Dead Live at Ventura County Fairgrounds on 1982-07-18"],["25-07-1982","Grateful Dead Live at Compton Terrace Amphitheatre on 1982-07-25"],["27-07-1982","Grateful Dead Live at Red Rocks Amphitheatre on 1982-07-27"],["28-07-1982","Grateful Dead Live at Red Rocks Amphitheatre on 1982-07-28"],["29-07-1982","Grateful Dead Live at Red Rocks Amphitheatre on 1982-07-29"],["31-07-1982","Grateful Dead Live at Manor Downs on 1982-07-31"],["01-08-1982","Grateful Dead Live at Zoo Amphitheater on 1982-08-01"],["03-08-1982","Grateful Dead Live at Starlight Theater on 1982-08-03"],["04-08-1982","Grateful Dead Live at Kiel Auditorium on 1982-08-04"],["06-08-1982","Grateful Dead Live at St. Paul Civic Center on 1982-08-06"],["07-08-1982","Grateful Dead Live at Alpine Valley Music Theatre on 1982-08-07"],["08-08-1982","Grateful Dead Live at Alpine Valley Music Theatre on 1982-08-08"],["10-08-1982","Grateful Dead Live at University of Iowa on 1982-08-10"],["28-08-1982","Grateful Dead Live at Oregon County Fair on 1982-08-28"],["29-08-1982","Grateful Dead Live at Seattle Center Coliseum on 1982-08-29"],["05-09-1982","Grateful Dead Live at Glen Helen Regional Park on 1982-09-05"],["09-09-1982","The Grateful Dead Live at Saenger Performing Arts Center on 1982-09-09"],["11-09-1982","Grateful Dead Live at West Palm Beach Auditorium on 1982-09-11"],["12-09-1982","The Grateful Dead Live at Lakeland Civic Center on 1982-09-12"],["14-09-1982","Grateful Dead Live at University of Virginia on 1982-09-14"],["15-09-1982","Grateful Dead Live at Capital Centre on 1982-09-15"],["17-09-1982","Grateful Dead Live at Cumberland County Civic Center on 1982-09-17"],["18-09-1982","Grateful Dead Live at Boston Garden on 1982-09-18"],["20-09-1982","Grateful Dead Live at Madison Square Garden on 1982-09-20"],["21-09-1982","Grateful Dead Live at Madison Square Garden on 1982-09-21"],["23-09-1982","Grateful Dead Live at Veterans' Memorial Coliseum on 1982-09-23"],["24-09-1982","Grateful Dead Live at Carrier Dome, Syracuse U on 1982-09-24"],["09-10-1982","Grateful Dead Live at Frost Ampitheater on 1982-10-09"],["10-10-1982","Grateful Dead Live at Frost Amphitheatre on 1982-10-10"],["17-10-1982","Grateful Dead Live at Santa Fe Downs on 1982-10-17"],["25-11-1982","Grateful Dead Live at Bob Marley Performing Arts Center on 1982-11-25"],["26-11-1982","Grateful Dead Live at World Music Festival on 1982-11-26"],["26-12-1982","Grateful Dead Live at Oakland Auditorium on 1982-12-26"],["27-12-1982","Grateful Dead Live at Oakland Auditorium on 1982-12-27"],["28-12-1982","Grateful Dead Live at Oakland Auditorium Arena on 1982-12-28"],["30-12-1982","Grateful Dead Live at Oakland Auditorium on 1982-12-30"],["31-12-1982","Grateful Dead Live at Oakland Auditorium Arena on 1982-12-31"],["24-01-1983","Grateful Dead Live at Stone House Studio - Rehearsals on 1983-01-24"],["31-01-1983","Grateful Dead Live at Stone House Studio - Rehearsals on 1983-01-31"],["01-02-1983","Grateful Dead Live at Stone House Studio - Rehearsals on 1983-02-01"],["06-02-1983","Grateful Dead Live at Stone House Studio - Rehearsals on 1983-02-06"],["14-03-1983","Grateful Dead Live at Club Front - Rehearsals on 1983-03-14"],["25-03-1983","Grateful Dead Live at Compton Terrace Amphitheatre on 1983-03-25"],["26-03-1983","Grateful Dead Live at Aladdin Theatre on 1983-03-26"],["27-03-1983","Grateful Dead Live at Irvine Meadows on 1983-03-27"],["29-03-1983","Grateful Dead Live at Warfield Theater on 1983-03-29"],["30-03-1983","Grateful Dead Live at Warfield Theatre on 1983-03-30"],["31-03-1983","Grateful Dead Live at Warfield Theatre on 1983-03-31"],["09-04-1983","Grateful Dead Live at Hampton Coliseum on 1983-04-09"],["10-04-1983","Grateful Dead Live at West Virginia University Coliseum on 1983-04-10"],["12-04-1983","Grateful Dead Live at Broome County Arena on 1983-04-12"],["13-04-1983","Grateful Dead Live at Patrick Gymnasium, U of Vermont on 1983-04-13"],["15-04-1983","Grateful Dead Live at Community War Memorial Auditorium on 1983-04-15"],["16-04-1983","Grateful Dead Live at Meadowlands Arena on 1983-04-16"],["17-04-1983","Grateful Dead Live at Meadowlands Arena on 1983-04-17"],["19-04-1983","Grateful Dead Live at Alfond Arena, U of Maine on 1983-04-19"],["20-04-1983","Grateful Dead Live at Providence Civic Center on 1983-04-20"],["22-04-1983","Grateful Dead Live at Veterans' Memorial Coliseum on 1983-04-22"],["23-04-1983","Grateful Dead Live at Veterans' Memorial Coliseum on 1983-04-23"],["25-04-1983","Grateful Dead Live at The Spectrum on 1983-04-25"],["26-04-1983","Grateful Dead Live at The Spectrum on 1983-04-26"],["13-05-1983","Grateful Dead Live at Greek Theater on 1983-05-13"],["14-05-1983","Grateful Dead Live at Greek Theatre - University of California on 1983-05-14"],["15-05-1983","Grateful Dead Live at Greek Theatre, University Of California on 1983-05-15"],["18-06-1983","Grateful Dead Live at Saratoga Performing Arts Center on 1983-06-18"],["20-06-1983","Grateful Dead Live at Merriweather Post Pavillion on 1983-06-20"],["21-06-1983","Grateful Dead Live at Merriweather Post Pavilion on 1983-06-21"],["22-06-1983","Grateful Dead Live at City Island on 1983-06-22"],["24-06-1983","Grateful Dead Live at Dane County Coliseum on 1983-06-24"],["25-06-1983","Grateful Dead Live at St. Paul Civic Center on 1983-06-25"],["27-06-1983","Grateful Dead Live at Poplar Creek Music Theater on 1983-06-27"],["28-06-1983","Grateful Dead Live at Poplar Creek Music Theater on 1983-06-28"],["30-07-1983","Grateful Dead Live at Ventura County Fairgrounds on 1983-07-30"],["31-07-1983","Grateful Dead Live at Ventura County Fairgrounds on 1983-07-31"],["20-08-1983","Grateful Dead Live at Frost Amphitheatre on 1983-08-20"],["21-08-1983","Grateful Dead Live at Frost Amphitheatre on 1983-08-21"],["26-08-1983","Grateful Dead Live at Memorial Coliseum on 1983-08-26"],["27-08-1983","Grateful Dead Live at Seattle Center Coliseum on 1983-08-27"],["29-08-1983","Grateful Dead Live at Silva Hall, Hult Center on 1983-08-29"],["30-08-1983","Grateful Dead Live at Silva Hall, Hult Center on 1983-08-30"],["31-08-1983","Grateful Dead Live at Silva Hall, Hult Center on 1983-08-31"],["02-09-1983","Grateful Dead Live at Boise Pavilion - Boise State University on 1983-09-02"],["04-09-1983","Grateful Dead Live at Park West Ski Resort on 1983-09-04"],["06-09-1983","Grateful Dead Live at Red Rocks Amphitheatre on 1983-09-06"],["07-09-1983","Grateful Dead Live at Red Rocks Amphitheater on 1983-09-07"],["08-09-1983","Grateful Dead Live at Red Rocks on 1983-09-08"],["10-09-1983","Grateful Dead Live at Downs of Santa Fe on 1983-09-10"],["11-09-1983","Grateful Dead Live at Santa Fe Downs on 1983-09-11"],["13-09-1983","Grateful Dead Live at Manor Downs on 1983-09-13"],["18-09-1983","Grateful Dead Live at Nevada County Fairgrounds on 1983-09-18"],["24-09-1983","Grateful Dead Live at Santa Cruz County Fairgrounds on 1983-09-24"],["08-10-1983","Grateful Dead Live at Richmond Coliseum on 1983-10-08"],["09-10-1983","Grateful Dead Live at Greensboro Coliseum on 1983-10-09"],["11-10-1983","Grateful Dead Live at Madison Square Garden on 1983-10-11"],["12-10-1983","Grateful Dead Live at Madison Square Garden on 1983-10-12"],["14-10-1983","Grateful Dead Live at Hartford Civic Center on 1983-10-14"],["15-10-1983","Grateful Dead Live at Hartford Civic Center on 1983-10-15"],["17-10-1983","Grateful Dead Live at Olympic Arena on 1983-10-17"],["18-10-1983","Grateful Dead Live at Cumberland County Civic Center on 1983-10-18"],["20-10-1983","Grateful Dead Live at The Centrum on 1983-10-20"],["21-10-1983","Grateful Dead Live at The Centrum on 1983-10-21"],["22-10-1983","Grateful Dead Live at Carrier Dome, Syracuse University on 1983-10-22"],["30-10-1983","Grateful Dead Live at Marin County Veterans Auditorium on 1983-10-30"],["31-10-1983","Grateful Dead Live at Marin County Civic Center on 1983-10-31"],["27-12-1983","Grateful Dead Live at Civic Auditorium on 1983-12-27"],["28-12-1983","Grateful Dead Live at Civic Auditorium on 1983-12-28"],["30-12-1983","Grateful Dead Live at San Francisco Civic Auditorium on 1983-12-30"],["31-12-1983","Grateful Dead Live at Civic Auditorium on 1983-12-31"],["20-01-1984","Grateful Dead Live at Carrier Dome, Syracuse U on 1984-01-20"],["28-03-1984","Grateful Dead Live at Marin County Veterans Auditorium on 1984-03-28"],["29-03-1984","Grateful Dead Live at Marin County Veterans Auditorium on 1984-03-29"],["31-03-1984","Grateful Dead Live at Marin County Veterans Auditorium on 1984-03-31"],["01-04-1984","Grateful Dead Live at Marin County Veterans Auditorium on 1984-04-01"],["04-04-1984","Grateful Dead Live at Providence Civic Center on 1984-04-04"],["06-04-1984","Grateful Dead Live at Aladdin Theater on 1984-04-06"],["07-04-1984","Grateful Dead Live at Irvine Meadows on 1984-04-07"],["13-04-1984","Grateful Dead Live at Hampton Coliseum on 1984-04-13"],["14-04-1984","Grateful Dead Live at Hampton Coliseum on 1984-04-14"],["16-04-1984","Grateful Dead Live at Rochester War Memorial on 1984-04-16"],["17-04-1984","Grateful Dead Live at Niagra Falls Convention Center on 1984-04-17"],["19-04-1984","Grateful Dead Live at Philadelphia Civic Center on 1984-04-19"],["20-04-1984","Grateful Dead Live at Philadelphia Civic Center on 1984-04-20"],["21-04-1984","Grateful Dead Live at Philadelphia Civic Center on 1984-04-21"],["23-04-1984","Grateful Dead Live at Veterans' Memorial Coliseum on 1984-04-23"],["24-04-1984","Grateful Dead Live at Veterans' Memorial Coliseum on 1984-04-24"],["26-04-1984","Grateful Dead Live at Providence Civic Center on 1984-04-26"],["27-04-1984","Grateful Dead Live at Providence Civic Center on 1984-04-27"],["29-04-1984","Grateful Dead Live at Nassau Coliseum on 1984-04-29"],["30-04-1984","Grateful Dead Live at Nassau Coliseum on 1984-04-30"],["06-05-1984","Grateful Dead Live at Silva Hall, Hult Center on 1984-05-06"],["07-05-1984","Grateful Dead Live at Silva Hall, Hult Center on 1984-05-07"],["08-05-1984","Grateful Dead Live at Silva Hall, Hult Center on 1984-05-08"],["09-06-1984","Grateful Dead Live at Cal Expo on 1984-06-09"],["10-06-1984","Grateful Dead Live at Cal Expo on 1984-06-10"],["12-06-1984","Grateful Dead Live at Red Rocks Amphitheatre on 1984-06-12"],["13-06-1984","Grateful Dead Live at Red Rocks Amphitheatre on 1984-06-13"],["14-06-1984","Grateful Dead Live at Red Rocks Amphitheatre on 1984-06-14"],["21-06-1984","Grateful Dead Live at Kingswood Music Theater on 1984-06-21"],["23-06-1984","Grateful Dead Live at City Island on 1984-06-23"],["24-06-1984","Grateful Dead Live at Saratoga Performing Arts Center on 1984-06-24"],["26-06-1984","Grateful Dead Live at Merriweather Post Pavilion on 1984-06-26"],["27-06-1984","Grateful Dead Live at Merriweather Post Pavilion on 1984-06-27"],["29-06-1984","Grateful Dead Live at Blossom Music Center on 1984-06-29"],["30-06-1984","Grateful Dead Live at Indianapolis Sports and Music Center on 1984-06-30"],["01-07-1984","Grateful Dead Live at Pine Knob Music Theater on 1984-07-01"],["03-07-1984","Grateful Dead Live at Starlight Theater on 1984-07-03"],["04-07-1984","Grateful Dead Live at Five Seasons Center on 1984-07-04"],["06-07-1984","Grateful Dead Live at Alpine Valley Music Theatre on 1984-07-06"],["07-07-1984","Grateful Dead Live at Alpine Valley Music Theatre on 1984-07-07"],["13-07-1984","Grateful Dead Live at Greek Theatre - University of California on 1984-07-13"],["14-07-1984","Grateful Dead Live at Greek Theatre on 1984-07-14"],["15-07-1984","Grateful Dead Live at Greek Theatre on 1984-07-15"],["21-07-1984","Grateful Dead Live at Ventura County Fairgrounds on 1984-07-21"],["22-07-1984","Grateful Dead Live at Ventura County Fairgrounds on 1984-07-22"],["05-10-1984","Grateful Dead Live at Charlotte Coliseum on 1984-10-05"],["06-10-1984","Grateful Dead Live at Richmond Coliseum on 1984-10-06"],["08-10-1984","Grateful Dead Live at The Centrum on 1984-10-08"],["09-10-1984","Grateful Dead Live at The Centrum on 1984-10-09"],["11-10-1984","Grateful Dead Live at Augusta Civic Center on 1984-10-11"],["12-10-1984","Grateful Dead Live at Augusta Civic Center on 1984-10-12"],["14-10-1984","Grateful Dead Live at Hartford Civic Center on 1984-10-14"],["15-10-1984","Grateful Dead Live at Hartford Civic Center on 1984-10-15"],["17-10-1984","Grateful Dead Live at Brendon Byrne Arena on 1984-10-17"],["18-10-1984","Grateful Dead Live at Meadowlands Arena on 1984-10-18"],["20-10-1984","Grateful Dead Live at Carrier Dome, Syracuse U on 1984-10-20"],["27-10-1984","Grateful Dead Live at Berkeley Community Theater on 1984-10-27"],["28-10-1984","Grateful Dead Live at Berkeley Community Theatre on 1984-10-28"],["30-10-1984","Grateful Dead Live at Berkeley Community Theater on 1984-10-30"],["31-10-1984","Grateful Dead Live at Berkeley Community Theater on 1984-10-31"],["02-11-1984","Grateful Dead Live at Berkeley Community Theatre on 1984-11-02"],["03-11-1984","Grateful Dead Live at Berkeley Community Theater on 1984-11-03"],["28-12-1984","Grateful Dead Live at San Francisco Civic Auditorium on 1984-12-28"],["29-12-1984","Grateful Dead Live at San Francisco Civic Center on 1984-12-29"],["31-12-1984","Grateful Dead Live at San Francisco Civic Auditorium on 1984-12-31"],["18-02-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-02-18"],["19-02-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-02-19"],["20-02-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-02-20"],["09-03-1985","Grateful Dead Live at Berkeley Community Theatre on 1985-03-09"],["10-03-1985","Grateful Dead Live at Berkeley Community Theater on 1985-03-10"],["12-03-1985","Grateful Dead Live at Berkeley Community Theater on 1985-03-12"],["13-03-1985","Grateful Dead Live at Berkeley Community Theater on 1985-03-13"],["21-03-1985","Grateful Dead Live at Hampton Coliseum on 1985-03-21"],["22-03-1985","Grateful Dead Live at Hampton Coliseum on 1985-03-22"],["24-03-1985","Grateful Dead Live at Springfield Civic Center on 1985-03-24"],["25-03-1985","Grateful Dead Live at Springfield Civic Center on 1985-03-25"],["27-03-1985","Grateful Dead Live at Nassau Coliseum on 1985-03-27"],["28-03-1985","Grateful Dead Live at Nassau Veterans Memorial Coliseum on 1985-03-28"],["29-03-1985","Grateful Dead Live at Nassau Coliseum on 1985-03-29"],["31-03-1985","Grateful Dead Live at Cumberland County Civic Center on 1985-03-31"],["01-04-1985","Grateful Dead Live at Cumberland County Civic Center on 1985-04-01"],["03-04-1985","Grateful Dead Live at Civic Center on 1985-04-03"],["04-04-1985","Grateful Dead Live at Providence Civic Center on 1985-04-04"],["06-04-1985","Grateful Dead Live at The Spectrum on 1985-04-06"],["07-04-1985","Grateful Dead Live at The Spectrum on 1985-04-07"],["08-04-1985","Grateful Dead Live at The Spectrum on 1985-04-08"],["13-04-1985","Grateful Dead Live at Irvine Meadows on 1985-04-13"],["14-04-1985","Grateful Dead Live at Irvine Meadows on 1985-04-14"],["21-04-1985","Grateful Dead Live at Marin Veterans Memorial Auditorium on 1985-04-21"],["27-04-1985","Grateful Dead Live at x on 1985-04-27"],["28-04-1985","Grateful Dead Live at Frost Amphitheatre on 1985-04-28"],["14-06-1985","Grateful Dead Live at Greek Theater on 1985-06-14"],["15-06-1985","Grateful Dead Live at Greek Theatre - University of California on 1985-06-15"],["16-06-1985","Grateful Dead Live at Greek Theater on 1985-06-16"],["21-06-1985","Grateful Dead Live at Alpine Valley Music Theatre on 1985-06-21"],["22-06-1985","Grateful Dead Live at Alpine Valley Music Theatre on 1985-06-22"],["24-06-1985","Grateful Dead Live at River Bend Music Center on 1985-06-24"],["25-06-1985","Grateful Dead Live at Blossom Music Center on 1985-06-25"],["27-06-1985","Grateful Dead Live at SPAC on 1985-06-27"],["28-06-1985","Grateful Dead Live at Hershey Park Stadium on 1985-06-28"],["30-06-1985","Grateful Dead Live at Merriweather Post Pavilion on 1985-06-30"],["01-07-1985","Grateful Dead Live at Merriweather Post Pavilion on 1985-07-01"],["02-07-1985","Grateful Dead Live at Civic Arena on 1985-07-02"],["13-07-1985","Grateful Dead Live at Ventura County Fairgrounds on 1985-07-13"],["14-07-1985","Grateful Dead Live at Ventura County Fairgrounds on 1985-07-14"],["24-08-1985","Grateful Dead Live at Boreal Ridge Ski Resort on 1985-08-24"],["30-08-1985","Grateful Dead Live at Southern Star Amphitheater on 1985-08-30"],["31-08-1985","Grateful Dead Live at Manor Downs on 1985-08-31"],["02-09-1985","Grateful Dead Live at Zoo Ampitheatre on 1985-09-02"],["03-09-1985","Grateful Dead Live at Starlight Theatre on 1985-09-03"],["05-09-1985","Grateful Dead Live at Red Rocks Ampitheatre on 1985-09-05"],["06-09-1985","Grateful Dead Live at Red Rocks Amphitheatre on 1985-09-06"],["07-09-1985","Grateful Dead Live at Red Rocks Amphitheatre on 1985-09-07"],["10-09-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-09-10"],["11-09-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-09-11"],["12-09-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-09-12"],["15-09-1985","Grateful Dead Live at Devore Field, Southwestern U on 1985-09-15"],["25-10-1985","Grateful Dead Live at Sportatorium on 1985-10-25"],["26-10-1985","Grateful Dead Live at Sun Dome on 1985-10-26"],["28-10-1985","Grateful Dead Live at Fox Theater on 1985-10-28"],["29-10-1985","Grateful Dead Live at Fox Theatre on 1985-10-29"],["31-10-1985","Grateful Dead Live at Carolina Coliseum - University of South Carolina on 1985-10-31"],["01-11-1985","Grateful Dead Live at Richmond Coliseum on 1985-11-01"],["02-11-1985","Grateful Dead Live at Richmond Coliseum on 1985-11-02"],["04-11-1985","Grateful Dead Live at The Centrum on 1985-11-04"],["05-11-1985","Grateful Dead Live at The Centrum on 1985-11-05"],["07-11-1985","Grateful Dead Live at Community War Memorial Auditorium on 1985-11-07"],["08-11-1985","Grateful Dead Live at Community War Memorial Auditorium on 1985-11-08"],["10-11-1985","Grateful Dead Live at Meadowlands Arena on 1985-11-10"],["11-11-1985","Grateful Dead Live at Brendan Byrne Arena on 1985-11-11"],["16-11-1985","Grateful Dead Live at Long Beach Arena on 1985-11-16"],["17-11-1985","Grateful Dead Live at Long Beach Arena on 1985-11-17"],["20-11-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-11-20"],["21-11-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-11-21"],["22-11-1985","Grateful Dead Live at Henry J. Kaiser Convention Center on 1985-11-22"],["17-12-1985","Grateful Dead Live at Oakland-Alameda County Coliseum on 1985-12-17"],["30-12-1985","Grateful Dead Live at Oakland Coliseum on 1985-12-30"],["31-12-1985","Grateful Dead Live at Oakland-Alameda County Coliseum on 1985-12-31"],["08-02-1986","Grateful Dead Live at Henry J. Kaiser Convention Center on 1986-02-08"],["09-02-1986","Grateful Dead Live at Henry J. Kaiser Convention Center on 1986-02-09"],["11-02-1986","Grateful Dead Live at Henry J. Kaiser Convention Center on 1986-02-11"],["12-02-1986","Grateful Dead Live at Henry J. Kaiser Convention Center on 1986-02-12"],["14-02-1986","Grateful Dead Live at Henry J. Kaiser Center on 1986-02-14"],["19-03-1986","Grateful Dead Live at Hampton Coliseum on 1986-03-19"],["20-03-1986","Grateful Dead Live at Hampton Coliseum on 1986-03-20"],["21-03-1986","Grateful Dead Live at Hampton Coliseum on 1986-03-21"],["23-03-1986","Grateful Dead Live at The Spectrum on 1986-03-23"],["24-03-1986","Grateful Dead Live at The Spectrum on 1986-03-24"],["25-03-1986","Grateful Dead Live at The Spectrum on 1986-03-25"],["27-03-1986","Grateful Dead Live at Cumberland County Civic Center on 1986-03-27"],["28-03-1986","Grateful Dead Live at Cumberland County Civic Center on 1986-03-28"],["30-03-1986","Grateful Dead Live at Providence Civic Center on 1986-03-30"],["31-03-1986","Grateful Dead Live at Providence Civic Center on 1986-03-31"],["01-04-1986","Grateful Dead Live at Providence Civic Center on 1986-04-01"],["03-04-1986","Grateful Dead Live at Hartford Civic Center on 1986-04-03"],["04-04-1986","Grateful Dead Live at Hartford Civic Center on 1986-04-04"],["12-04-1986","Grateful Dead Live at Irvine Meadows on 1986-04-12"],["13-04-1986","Grateful Dead Live at Irvine Meadows on 1986-04-13"],["18-04-1986","Grateful Dead Live at Berkeley Community Theatre on 1986-04-18"],["19-04-1986","Grateful Dead Live at Berkeley Community Theatre on 1986-04-19"],["21-04-1986","Grateful Dead Live at Berkeley Community Theater on 1986-04-21"],["22-04-1986","Grateful Dead Live at Berkeley Community Theater on 1986-04-22"],["03-05-1986","Grateful Dead Live at Cal Expo on 1986-05-03"],["04-05-1986","Grateful Dead Live at Cal Expo Amphitheatre on 1986-05-04"],["10-05-1986","Grateful Dead Live at Frost Amphitheatre on 1986-05-10"],["11-05-1986","Grateful Dead Live at Frost Amphitheatre on 1986-05-11"],["20-06-1986","Grateful Dead Live at Greek Theatre on 1986-06-20"],["21-06-1986","Grateful Dead Live at Greek Theatre - University of California on 1986-06-21"],["22-06-1986","Grateful Dead Live at Greek Theatre, U. Of California on 1986-06-22"],["26-06-1986","Grateful Dead Live at Hubert H. Humphrey Metrodome on 1986-06-26"],["28-06-1986","Grateful Dead Live at Alpine Valley Music Theatre on 1986-06-28"],["29-06-1986","Grateful Dead Live at Alpine Valley Music Theatre on 1986-06-29"],["30-06-1986","Grateful Dead Live at Riverbend Music Center on 1986-06-30"],["02-07-1986","Grateful Dead Live at Rubber Bowl, University of Akron on 1986-07-02"],["04-07-1986","Grateful Dead Live at Rich Stadium on 1986-07-04"],["06-07-1986","Grateful Dead Live at RFK Stadium on 1986-07-06"],["07-07-1986","Grateful Dead Live at RFK Stadium on 1986-07-07"],["15-12-1986","Grateful Dead Live at Oakland-Alameda County Coliseum on 1986-12-15"],["16-12-1986","Grateful Dead Live at Oakland Coliseum Arena on 1986-12-16"],["17-12-1986","Grateful Dead Live at Oakland-Alameda County Coliseum on 1986-12-17"],["27-12-1986","Grateful Dead Live at Henry J. Kaiser Convention Center on 1986-12-27"],["28-12-1986","Grateful Dead Live at Kaiser Convention Center on 1986-12-28"],["30-12-1986","Grateful Dead Live at Kaiser Convention Center on 1986-12-30"],["31-12-1986","Grateful Dead Live at Kaiser Convention Center on 1986-12-31"],["01-01-1987","Grateful Dead Live at Backstage on 1987-01-01"],["28-01-1987","Grateful Dead Live at San Francisco Civic Auditorium on 1987-01-28"],["29-01-1987","Grateful Dead Live at San Francisco Civic Center on 1987-01-29"],["30-01-1987","Grateful Dead Live at San Francisco Civic Auditorium on 1987-01-30"],["01-03-1987","Grateful Dead Live at Henry J. Kaiser Convention Center on 1987-03-01"],["02-03-1987","Grateful Dead Live at Henry J Kaiser Convention Center on 1987-03-02"],["03-03-1987","Grateful Dead Live at Henry J. Kaiser Convention Center on 1987-03-03"],["22-03-1987","Grateful Dead Live at Hampton Coliseum on 1987-03-22"],["23-03-1987","Grateful Dead Live at Hampton Coliseum on 1987-03-23"],["24-03-1987","Grateful Dead Live at Hampton Coliseum on 1987-03-24"],["26-03-1987","Grateful Dead Live at Hartford Civic Center on 1987-03-26"],["27-03-1987","Grateful Dead Live at Hartford Civic Center on 1987-03-27"],["29-03-1987","Grateful Dead Live at The Spectrum on 1987-03-29"],["30-03-1987","Grateful Dead Live at The Spectrum on 1987-03-30"],["31-03-1987","Grateful Dead Live at The Spectrum on 1987-03-31"],["02-04-1987","Grateful Dead Live at The Centrum on 1987-04-02"],["03-04-1987","Grateful Dead 1987 04 03 Worcester Centrum Set II"],["04-04-1987","Grateful Dead Live at The Centrum on 1987-04-04"],["06-04-1987","Grateful Dead Live at Meadowlands Arena on 1987-04-06"],["07-04-1987","Grateful Dead Live at Meadowlands Arena on 1987-04-07"],["09-04-1987","Grateful Dead Live at UIC Pavilion on 1987-04-09"],["10-04-1987","Grateful Dead Live at UIC Pavilion on 1987-04-10"],["11-04-1987","Grateful Dead Live at Uof Illinois - Chicago Pavilion on 1987-04-11"],["17-04-1987","Grateful Dead Live at Irvine Meadows on 1987-04-17"],["18-04-1987","Grateful Dead Live at Irvine Meadows on 1987-04-18"],["19-04-1987","Grateful Dead Live at Irvine Meadows on 1987-04-19"],["02-05-1987","Grateful Dead Live at Frost Amphitheatre on 1987-05-02"],["03-05-1987","Grateful Dead Live at Frost Amphitheatre on 1987-05-03"],["09-05-1987","Grateful Dead Live at Laguna Seca Raceway on 1987-05-09"],["10-05-1987","Grateful Dead Live at Laguna Seca Raceway on 1987-05-10"],["01-06-1987","Grateful Dead"],["12-06-1987","Grateful Dead Live at Ventura County Fairgrounds on 1987-06-12"],["13-06-1987","Grateful Dead Live at Ventura County Fairgrounds on 1987-06-13"],["14-06-1987","Grateful Dead Live at Ventura County Fairgrounds on 1987-06-14"],["19-06-1987","Grateful Dead Live at Greek Theatre, U. Of California on 1987-06-19"],["20-06-1987","Grateful Dead Live at Greek Theater on 1987-06-20"],["21-06-1987","Grateful Dead Live at Greek Theater on 1987-06-21"],["26-06-1987","Grateful Dead Live at Alpine Valley Music Theatre on 1987-06-26"],["27-06-1987","Grateful Dead Live at Alpine Valley Music Theatre on 1987-06-27"],["28-06-1987","Grateful Dead Live at Alpine Valley Music Theatre on 1987-06-28"],["30-06-1987","Grateful Dead Live at Kingswood Music Theater on 1987-06-30"],["02-07-1987","Grateful Dead Live at Silver Stadium on 1987-07-02"],["04-07-1987","Grateful Dead Live at Sullivan Stadium on 1987-07-04"],["06-07-1987","Grateful Dead Live at Civic Arena on 1987-07-06"],["07-07-1987","Grateful Dead Live at Roanoke Civic Center on 1987-07-07"],["08-07-1987","Grateful Dead Live at Roanoke Civic Center on 1987-07-08"],["10-07-1987","Grateful Dead Live at JFK Stadium on 1987-07-10"],["12-07-1987","Grateful Dead Live at Giants Stadium on 1987-07-12"],["19-07-1987","Grateful Dead Live at Autzen Stadium - University of Oregon on 1987-07-19"],["24-07-1987","Grateful Dead 7-24-87, Oakland Stadium Oakland, CA"],["26-07-1987","Grateful Dead Live at Anaheim Stadium on 1987-07-26"],["11-08-1987","Grateful Dead Live at Red Rocks Amphitheatre on 1987-08-11"],["12-08-1987","Grateful Dead Live at Red Rocks Amphitheatre on 1987-08-12"],["13-08-1987","Grateful Dead Live at Red Rocks Amphitheatre on 1987-08-13"],["15-08-1987","Grateful Dead Live at Town Park on 1987-08-15"],["16-08-1987","Grateful Dead Live at Town Park on 1987-08-16"],["18-08-1987","Grateful Dead Live at Compton Terrace Amphitheatre on 1987-08-18"],["20-08-1987","Grateful Dead Live at Park West Ski Resort on 1987-08-20"],["22-08-1987","Grateful Dead Live at Calaveras Co. Fairgrounds on 1987-08-22"],["23-08-1987","Grateful Dead Live at Calaveras Co. Fairgrounds on 1987-08-23"],["07-09-1987","Grateful Dead Live at Providence Civic Center on 1987-09-07"],["08-09-1987","Grateful Dead Live at Providence Civic Center on 1987-09-08"],["09-09-1987","Grateful Dead Live at Civic Center on 1987-09-09"],["11-09-1987","Grateful Dead Live at Capital Centre on 1987-09-11"],["12-09-1987","Grateful Dead Live at Capital Centre on 1987-09-12"],["13-09-1987","Grateful Dead Live at Capital Centre on 1987-09-13"],["15-09-1987","Grateful Dead Live at Madison Square Garden on 1987-09-15"],["16-09-1987","Grateful Dead Live at Madison Square Garden on 1987-09-16"],["18-09-1987","Grateful Dead Live at Madison Square Garden on 1987-09-18"],["19-09-1987","Grateful Dead Live at Madison Square Garden on 1987-09-19"],["20-09-1987","Grateful Dead Live at Madison Square Garden on 1987-09-20"],["22-09-1987","Grateful Dead Live at The Spectrum on 1987-09-22"],["23-09-1987","Grateful Dead Live at The Spectrum on 1987-09-23"],["24-09-1987","Grateful Dead Live at The Spectrum on 1987-09-24"],["02-10-1987","Grateful Dead Live at Shoreline Amphitheatre on 1987-10-02"],["03-10-1987","Grateful Dead Live at Shoreline Amphitheatre on 1987-10-03"],["04-10-1987","Grateful Dead Live at Shoreline Amphitheatre on 1987-10-04"],["06-11-1987","Grateful Dead Live at Henry J. Kaiser Auditorium on 1987-11-06"],["07-11-1987","Grateful Dead Live at Henry J. Kaiser Convention Center on 1987-11-07"],["08-11-1987","Grateful Dead Live at Henry J. Kaiser Convention Center on 1987-11-08"],["13-11-1987","Grateful Dead Live at Long Beach Arena on 1987-11-13"],["14-11-1987","Grateful Dead Live at Long Beach Arena on 1987-11-14"],["15-11-1987","Grateful Dead Live at Long Beach Arena on 1987-11-15"],["27-12-1987","Grateful Dead Live at Oakland Coliseum Arena on 1987-12-27"],["28-12-1987","Grateful Dead Live at Oakland Coliseum Arena on 1987-12-28"],["30-12-1987","Grateful Dead Live at Oakland Coliseum Arena on 1987-12-30"],["31-12-1987","Grateful Dead Live at Oakland Coliseum Arena on 1987-12-31"],["13-02-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-02-13"],["14-02-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-02-14"],["16-02-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-02-16"],["17-02-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-02-17"],["12-03-1988","Grateful Dead Live at Civic Auditorium on 1988-03-12"],["16-03-1988","Grateful Dead Live at Henry J. Kaiser Convention Center on 1988-03-16"],["17-03-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-03-17"],["18-03-1988","Grateful Dead Live at Henry J. Kaiser Auditorium on 1988-03-18"],["24-03-1988","Grateful Dead Live at Omni Coliseum on 1988-03-24"],["26-03-1988","Grateful Dead Live at Hampton Coliseum on 1988-03-26"],["27-03-1988","Grateful Dead"],["28-03-1988","Grateful Dead"],["30-03-1988","Grateful Dead Live at Meadowlands Arena on 1988-03-30"],["31-03-1988","Grateful Dead Live at Meadowlands Arena on 1988-03-31"],["01-04-1988","Grateful Dead Live at Meadowlands Arena on 1988-04-01"],["03-04-1988","Grateful Dead Live at Civic Center on 1988-04-03"],["04-04-1988","Grateful Dead Live at Civic Center on 1988-04-04"],["05-04-1988","Grateful Dead Live at Civic Center on 1988-04-05"],["07-04-1988","Grateful Dead Live at The Centrum on 1988-04-07"],["08-04-1988","Grateful Dead Live at The Centrum on 1988-04-08"],["09-04-1988","Grateful Dead Live at The Centrum on 1988-04-09"],["11-04-1988","Grateful Dead Live at Joe Louis Arena on 1988-04-11"],["13-04-1988","Grateful Dead Live at Rosemont Horizon on 1988-04-13"],["14-04-1988","Grateful Dead Live at Rosemont Horizon on 1988-04-14"],["15-04-1988","Grateful Dead Live at Rosemont Horizon on 1988-04-15"],["22-04-1988","Grateful Dead Live at Irvine Meadows on 1988-04-22"],["23-04-1988","Grateful Dead Live at Irvine Meadows on 1988-04-23"],["24-04-1988","Grateful Dead Live at Irvine Meadows on 1988-04-24"],["30-04-1988","Grateful Dead Live at Frost Amphitheatre on 1988-04-30"],["01-05-1988","Grateful Dead Live at Frost Amphitheatre on 1988-05-01"],["01-06-1988","Grateful Dead Live at Unknown on 1988-06-01"],["17-06-1988","Grateful Dead Live at Metropolitan Sports Center on 1988-06-17"],["19-06-1988","Grateful Dead Live at Alpine Valley Music Theatre on 1988-06-19"],["20-06-1988","Grateful Dead Live at Alpine Valley Music Theatre on 1988-06-20"],["22-06-1988","Grateful Dead Live at Alpine Valley Music Theatre on 1988-06-22"],["23-06-1988","Grateful Dead Live at Alpine Valley Music Center on 1988-06-23"],["25-06-1988","Grateful Dead Live at Buckeye Lake Music Center on 1988-06-25"],["26-06-1988","Grateful Dead Live at Civic Arena on 1988-06-26"],["28-06-1988","Grateful Dead Live at Saratoga Performing Arts Center on 1988-06-28"],["30-06-1988","Grateful Dead Live at Silver Stadium on 1988-06-30"],["02-07-1988","Grateful Dead Live at Oxford Plains Speedway on 1988-07-02"],["03-07-1988","Grateful Dead Live at Oxford Plains Speedway on 1988-07-03"],["15-07-1988","Grateful Dead Live at Greek Theater - University of California on 1988-07-15"],["16-07-1988","Grateful Dead Live at Greek Theatre, U. Of California on 1988-07-16"],["17-07-1988","Grateful Dead Live at Greek Theater - University of California on 1988-07-17"],["29-07-1988","Grateful Dead Live at Laguna Seca Recreation Area on 1988-07-29"],["30-07-1988","Grateful Dead Live at Laguna Seca Raceway on 1988-07-30"],["31-07-1988","Grateful Dead Live at Laguna Seca Recreation Area on 1988-07-31"],["26-08-1988","Grateful Dead Live at Tacoma Dome on 1988-08-26"],["28-08-1988","Grateful Dead Live at Autzen Stadium on 1988-08-28"],["02-09-1988","Grateful Dead Live at Capital Centre on 1988-09-02"],["03-09-1988","Grateful Dead Live at Capital Centre on 1988-09-03"],["05-09-1988","Grateful Dead Live at Capital Centre on 1988-09-05"],["06-09-1988","Grateful Dead Live at Capital Centre on 1988-09-06"],["08-09-1988","Grateful Dead Live at The Spectrum on 1988-09-08"],["09-09-1988","Grateful Dead Live at The Spectrum on 1988-09-09"],["11-09-1988","Grateful Dead Live at The Spectrum on 1988-09-11"],["12-09-1988","Grateful Dead Live at The Spectrum on 1988-09-12"],["14-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-14"],["15-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-15"],["16-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-16"],["18-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-18"],["19-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-19"],["20-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-20"],["22-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-22"],["23-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-23"],["24-09-1988","Grateful Dead Live at Madison Square Garden on 1988-09-24"],["30-09-1988","Grateful Dead Live at Shoreline Amphitheatre on 1988-09-30"],["01-10-1988","Grateful Dead Live at Shoreline Amphitheatre on 1988-10-01"],["02-10-1988","Grateful Dead Live at Shoreline Amphitheatre on 1988-10-02"],["14-10-1988","Grateful Dead Live at Miami Arena on 1988-10-14"],["15-10-1988","Grateful Dead Live at Bayfront Center Arena on 1988-10-15"],["16-10-1988","Grateful Dead Live at Bayfront Center on 1988-10-16"],["18-10-1988","Grateful Dead Live at Keifer Lakefront Arena on 1988-10-18"],["20-10-1988","Grateful Dead Live at The Summit on 1988-10-20"],["21-10-1988","Grateful Dead Live at Reunion Arena on 1988-10-21"],["09-12-1988","Grateful Dead Live at Long Beach Arena on 1988-12-09"],["10-12-1988","Grateful Dead Live at Long Beach Arena on 1988-12-10"],["11-12-1988","Grateful Dead Live at Long Beach Arena on 1988-12-11"],["28-12-1988","Grateful Dead Live at Oakland Coliseum Arena on 1988-12-28"],["29-12-1988","Grateful Dead Live at Oakland-Alameda County Coliseum on 1988-12-29"],["31-12-1988","Grateful Dead Live at Oakland Coliseum Arena on 1988-12-31"],["01-01-1989","Grateful Dead Live at Ante Up - Built to Last interview on 1989-01-01"],["05-02-1989","Grateful Dead Live at Henry J Kaiser Convention Center on 1989-02-05"],["06-02-1989","Grateful Dead Live at Henry J Kaiser Convention Center on 1989-02-06"],["07-02-1989","Grateful Dead Live at Henry J Kaiser Convention Center on 1989-02-07"],["10-02-1989","Grateful Dead Live at Great Western Forum on 1989-02-10"],["11-02-1989","Grateful Dead Live at Great Western LA Forum on 1989-02-11"],["12-02-1989","Grateful Dead Live at Great Western LA Forum on 1989-02-12"],["01-03-1989","The Grateful Dead Live at Club Front - Grateful Dead Studio on 1989-03-01"],["27-03-1989","Grateful Dead Live at The Omni on 1989-03-27"],["28-03-1989","Grateful Dead Live at The Omni on 1989-03-28"],["30-03-1989","Grateful Dead Live at Greensboro Coliseum on 1989-03-30"],["31-03-1989","Grateful Dead Live at Greensboro Coliseum on 1989-03-31"],["02-04-1989","Grateful Dead Live at x on 1989-04-02"],["03-04-1989","Grateful Dead Live at Civic Arena on 1989-04-03"],["05-04-1989","Grateful Dead Live at Crisler Arena on 1989-04-05"],["06-04-1989","Grateful Dead Live at Crisler Arena on 1989-04-06"],["08-04-1989","Grateful Dead Live at Riverfront Coliseum on 1989-04-08"],["09-04-1989","Grateful Dead Live at Freedom Hall on 1989-04-09"],["11-04-1989","Grateful Dead Live at Rosemont Horizon on 1989-04-11"],["12-04-1989","Grateful Dead Live at Rosemont Horizon on 1989-04-12"],["13-04-1989","Grateful Dead Live at Rosemont Horizon on 1989-04-13"],["15-04-1989","Grateful Dead Live at Mecca on 1989-04-15"],["16-04-1989","Grateful Dead Live at The Mecca on 1989-04-16"],["17-04-1989","Grateful Dead Live at Metropolitan Sports Center on 1989-04-17"],["28-04-1989","Grateful Dead Live at Irvine Meadows on 1989-04-28"],["29-04-1989","Grateful Dead Live at Irvine Meadows on 1989-04-29"],["30-04-1989","Grateful Dead Live at Irvine Meadows on 1989-04-30"],["06-05-1989","Grateful Dead Live at Frost Amphitheatre on 1989-05-06"],["07-05-1989","Grateful Dead Live at Frost Ampitheater on 1989-05-07"],["27-05-1989","Grateful Dead Live at Oakland-Alameda County Stadium on 1989-05-27"],["18-06-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-06-18"],["19-06-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-06-19"],["21-06-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-06-21"],["02-07-1989","Grateful Dead Live at Sullivan Stadium on 1989-07-02"],["04-07-1989","Grateful Dead Live at Rich Stadium on 1989-07-04"],["07-07-1989","Grateful Dead Live at JFK Stadium on 1989-07-07"],["09-07-1989","Grateful Dead Live at Giants Stadium on 1989-07-09"],["10-07-1989","Grateful Dead Live at Giants Stadium on 1989-07-10"],["12-07-1989","Grateful Dead Live at RFK Stadium on 1989-07-12"],["13-07-1989","Grateful Dead Live at RFK Stadium on 1989-07-13"],["15-07-1989","Grateful Dead Live at Deer Creek Music Center on 1989-07-15"],["17-07-1989","Grateful Dead Live at Alpine Valley Music Theatre on 1989-07-17"],["18-07-1989","Grateful Dead Live at Alpine Valley on 1989-07-18"],["19-07-1989","Grateful Dead Live at Alpine Valley Music Theatre on 1989-07-19"],["04-08-1989","Grateful Dead Live at Cal Expo on 1989-08-04"],["05-08-1989","Grateful Dead Live at Cal Expo Amphitheatre on 1989-08-05"],["06-08-1989","Grateful Dead Live at Cal Expo Amphitheatre on 1989-08-06"],["17-08-1989","Grateful Dead Live at Greek Theatre - University of California on 1989-08-17"],["18-08-1989","Grateful Dead Live at Greek Theatre - University of California on 1989-08-18"],["19-08-1989","Grateful Dead Live at Greek Theatre - University of California on 1989-08-19"],["20-08-1989","Grateful Dead Live at Uptown Theater on 1989-08-20"],["27-09-1989","Grateful Dead Live at Warfield Theater on 1989-09-27"],["29-09-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-09-29"],["30-09-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-09-30"],["01-10-1989","Grateful Dead Live at Shoreline Amphitheatre on 1989-10-01"],["07-10-1989","Grateful Dead Live at Warfield Theater on 1989-10-07"],["08-10-1989","Grateful Dead Live at Hampton Coliseum on 1989-10-08"],["09-10-1989","Grateful Dead Live at Hampton Coliseum on 1989-10-09"],["11-10-1989","Grateful Dead Live at Meadowlands Arena on 1989-10-11"],["12-10-1989","Grateful Dead Live at Meadowlands Arena on 1989-10-12"],["14-10-1989","Grateful Dead Live at Brendan Byrne Arena on 1989-10-14"],["15-10-1989","Grateful Dead Live at Meadowlands Arena on 1989-10-15"],["16-10-1989","Grateful Dead Live at Meadowlands Arena on 1989-10-16"],["18-10-1989","Grateful Dead Live at The Spectrum on 1989-10-18"],["19-10-1989","Grateful Dead Live at The Spectrum on 1989-10-19"],["20-10-1989","Grateful Dead Live at The Spectrum on 1989-10-20"],["22-10-1989","Grateful Dead Live at Charlotte Coliseum on 1989-10-22"],["23-10-1989","Grateful Dead Live at Charlotte Coliseum on 1989-10-23"],["25-10-1989","Grateful Dead Live at Miami Arena on 1989-10-25"],["26-10-1989","The Grateful Dead - Insane Edition"],["06-12-1989","Grateful Dead Live at Oakland-Alameda County Coliseum Arena on 1989-12-06"],["08-12-1989","Grateful Dead Live at Great Western LA on 1989-12-08"],["09-12-1989","Grateful Dead Live at Great Western Forum on 1989-12-09"],["10-12-1989","Grateful Dead Live at Great Western LA Forum on 1989-12-10"],["27-12-1989","Grateful Dead Live at Oakland-Alameda County Coliseum on 1989-12-27"],["28-12-1989","Grateful Dead Live at Coliseum Arean on 1989-12-28"],["30-12-1989","Grateful Dead Live at Oakland Coliseum Arena on 1989-12-30"],["31-12-1989","GRATEFUL DEAD 1989-12-31 OAKLAND"],["25-02-1990","Grateful Dead Live at Oakland-Alameda County Coliseum Arena on 1990-02-25"],["26-02-1990","Grateful Dead Live at Oakland-Alameda County Coliseum Arena on 1990-02-26"],["27-02-1990","Grateful Dead Live at Oakland-Alameda County Coliseum on 1990-02-27"],["14-03-1990","Grateful Dead Live at Capital Centre on 1990-03-14"],["15-03-1990","Grateful Dead Live at Capital Centre on 1990-03-15"],["16-03-1990","Grateful Dead Live at Capital Centre on 1990-03-16"],["18-03-1990","Grateful Dead Live at Civic Center on 1990-03-18"],["19-03-1990","Grateful Dead Live at Hartford Civic Center on 1990-03-19"],["21-03-1990","Grateful Dead Live at Copps Coliseum on 1990-03-21"],["22-03-1990","Grateful Dead Live at Copps Coliseum on 1990-03-22"],["24-03-1990","Grateful Dead Live at Knickerbocker Arena on 1990-03-24"],["25-03-1990","Grateful Dead Live at Knickerbocker Arena on 1990-03-25"],["26-03-1990","Grateful Dead Live at Knickerbocker Arena on 1990-03-26"],["28-03-1990","Grateful Dead Live at Nassau Veterans Memorial Coliseum on 1990-03-28"],["29-03-1990","Grateful Dead Live at Nassau Coliseum on 1990-03-29"],["30-03-1990","Grateful Dead Live at Nassau Veterans Memorial Coliseum on 1990-03-30"],["01-04-1990","Grateful Dead Live at The Omni on 1990-04-01"],["02-04-1990","Grateful Dead Live at The Omni on 1990-04-02"],["03-04-1990","Grateful Dead Live at The Omni on 1990-04-03"],["05-05-1990","Grateful Dead Live at Cal State Dominguez Hills on 1990-05-05"],["06-05-1990","Grateful Dead Live at Cal State Dominguez Hills on 1990-05-06"],["08-06-1990","Grateful Dead Live at Cal Expo on 1990-06-08"],["09-06-1990","Grateful Dead Live at Cal Expo on 1990-06-09"],["10-06-1990","Grateful Dead Live at Cal Expo Amphitheatre on 1990-06-10"],["15-06-1990","Grateful Dead Live at Shoreline Amphitheatre on 1990-06-15"],["16-06-1990","Grateful Dead Live at Shoreline Amphitheatre on 1990-06-16"],["17-06-1990","Grateful Dead Live at Shoreline Amphitheatre on 1990-06-17"],["23-06-1990","Grateful Dead Live at Autzen Stadium on 1990-06-23"],["24-06-1990","Grateful Dead Live at Autzen Stadium on 1990-06-24"],["04-07-1990","Grateful Dead Live at Sandstone Ampitheatre on 1990-07-04"],["06-07-1990","Grateful Dead Live at Cardinal Stadium on 1990-07-06"],["08-07-1990","Grateful Dead Live at Three Rivers Stadium on 1990-07-08"],["10-07-1990","Grateful Dead Live at Carter-Finley Stadium on 1990-07-10"],["12-07-1990","Grateful Dead Live at Robert F. Kennedy Stadium on 1990-07-12"],["14-07-1990","Grateful Dead Live at Sullivan Stadium on 1990-07-14"],["16-07-1990","Grateful Dead Live at Rich Stadium on 1990-07-16"],["18-07-1990","Grateful Dead Live at Deer Creek Music Theater on 1990-07-18"],["19-07-1990","Grateful Dead Live at Deer Creek Music Center on 1990-07-19"],["21-07-1990","Grateful Dead Live at World Music Theatre on 1990-07-21"],["22-07-1990","Grateful Dead Live at World Music Theatre on 1990-07-22"],["23-07-1990","Grateful Dead Live at World Music Theatre on 1990-07-23"],["28-08-1990","Grateful Dead Live at Club Front on 1990-08-28"],["07-09-1990","Grateful Dead Live at Richfield Coliseum on 1990-09-07"],["08-09-1990","Grateful Dead Live at Coliseum on 1990-09-08"],["10-09-1990","Grateful Dead Live at The Spectrum on 1990-09-10"],["11-09-1990","Grateful Dead Live at The Spectrum on 1990-09-11"],["12-09-1990","Grateful Dead Live at The Spectrum on 1990-09-12"],["14-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-14"],["15-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-15"],["16-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-16"],["18-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-18"],["19-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-19"],["20-09-1990","Grateful Dead Live at Madison Square Garden on 1990-09-20"],["26-09-1990","Grateful Dead Live at Club Front on 1990-09-26"],["27-09-1990","Grateful Dead Live at Club Front on 1990-09-27"],["28-09-1990","Grateful Dead Live at Club Front on 1990-09-28"],["13-10-1990","Grateful Dead Live at Ice Stadium on 1990-10-13"],["17-10-1990","Grateful Dead Live at GrugaHalle on 1990-10-17"],["19-10-1990","Grateful Dead Live at Internationales Congress Centrum on 1990-10-19"],["20-10-1990","Grateful Dead Live at Internationales Congress Centrum on 1990-10-20"],["22-10-1990","Grateful Dead Live at Festhalle on 1990-10-22"],["24-10-1990","Grateful Dead Live at Sporthalle on 1990-10-24"],["27-10-1990","Grateful Dead Live at Zenith on 1990-10-27"],["28-10-1990","Grateful Dead Live at The Zenith on 1990-10-28"],["30-10-1990","Grateful Dead Live at Wembley Arena on 1990-10-30"],["31-10-1990","Grateful Dead Live at Wembley Arena on 1990-10-31"],["01-11-1990","Grateful Dead Live at Wembley Arena on 1990-11-01"],["03-12-1990","Grateful Dead Live at Coliseum Arena on 1990-12-03"],["04-12-1990","Grateful Dead Live at Oakland-Alameda County Coliseum on 1990-12-04"],["08-12-1990","Grateful Dead Live at Compton Terrace Amphitheatre on 1990-12-08"],["09-12-1990","Grateful Dead Live at Compton Terrace Amphitheatre on 1990-12-09"],["12-12-1990","Grateful Dead Live at McNichols Arena on 1990-12-12"],["13-12-1990","Grateful Dead Live at McNichols Arena on 1990-12-13"],["14-12-1990","Grateful Dead Live at McNichols Arena on 1990-12-14"],["27-12-1990","Grateful Dead Live at Coliseum Arena on 1990-12-27"],["28-12-1990","Grateful Dead Live at Coliseum Arena on 1990-12-28"],["30-12-1990","Grateful Dead Live at Coliseum Arena on 1990-12-30"],["31-12-1990","Grateful Dead Live at Oakland-Alameda County Coliseum on 1990-12-31"],["19-02-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-02-19"],["20-02-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-02-20"],["21-02-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-02-21"],["17-03-1991","Grateful Dead Live at Capitol Centre on 1991-03-17"],["18-03-1991","Grateful Dead Live at Capital Centre on 1991-03-18"],["20-03-1991","Grateful Dead Live at Capital Centre on 1991-03-20"],["21-03-1991","Grateful Dead Live at Capital Centre on 1991-03-21"],["23-03-1991","Grateful Dead Live at Knickerbocker Arena on 1991-03-23"],["24-03-1991","Grateful Dead Live at Knickerbocker Arena on 1991-03-24"],["25-03-1991","Grateful Dead Live at Knickerbocker Arena on 1991-03-25"],["27-03-1991","Grateful Dead Live at Nassau Veterans Memorial Coliseum on 1991-03-27"],["28-03-1991","Grateful Dead Live at Nassau Coliseum on 1991-03-28"],["29-03-1991","Grateful Dead Live at Nassau Coliseum on 1991-03-29"],["31-03-1991","Grateful Dead Live at Greensboro Coliseum on 1991-03-31"],["01-04-1991","Grateful Dead Live at Greensboro Coliseum on 1991-04-01"],["03-04-1991","Grateful Dead Live at The Omni on 1991-04-03"],["04-04-1991","Grateful Dead Live at The Omni on 1991-04-04"],["05-04-1991","Grateful Dead Live at The Omni on 1991-04-05"],["07-04-1991","Grateful Dead Live at Orlando Arena on 1991-04-07"],["08-04-1991","Grateful Dead Live at Orlando Arena on 1991-04-08"],["09-04-1991","Grateful Dead Live at Orlando Arena on 1991-04-09"],["27-04-1991","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1991-04-27"],["28-04-1991","Grateful Dead Live at Sam Boyd Silver Bowl on 1991-04-28"],["03-05-1991","Grateful Dead Live at Cal Expo on 1991-05-03"],["04-05-1991","Grateful Dead Live at Cal Expo on 1991-05-04"],["05-05-1991","Grateful Dead Live at Cal Expo on 1991-05-05"],["10-05-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-05-10"],["11-05-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-05-11"],["12-05-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-05-12"],["01-06-1991","Grateful Dead Live at Los Angeles Coliseum on 1991-06-01"],["06-06-1991","Grateful Dead Live at Deer Creek Music Center on 1991-06-06"],["07-06-1991","Grateful Dead Live at Deer Creek Music Center on 1991-06-07"],["09-06-1991","Grateful Dead Live at Buckeye Lake Music Center on 1991-06-09"],["11-06-1991","Grateful Dead Live at Charlotte Coliseum on 1991-06-11"],["12-06-1991","Grateful Dead Live at Charlotte Coliseum on 1991-06-12"],["14-06-1991","Grateful Dead Live at RFK Stadium on 1991-06-14"],["16-06-1991","Grateful Dead Live at Giants Stadium on 1991-06-16"],["17-06-1991","Grateful Dead Live at Giants Stadium on 1991-06-17"],["19-06-1991","Grateful Dead Live at Pine Knob Music Theater on 1991-06-19"],["20-06-1991","Grateful Dead Live at Pine Knob Music Theater on 1991-06-20"],["22-06-1991","Grateful Dead Live at Soldier Field on 1991-06-22"],["24-06-1991","Grateful Dead Live at Sandstone Amphitheatre on 1991-06-24"],["25-06-1991","Grateful Dead Live at Sandstone Amphitheatre on 1991-06-25"],["28-06-1991","Grateful Dead Live at Mile High Stadium on 1991-06-28"],["12-08-1991","Grateful Dead Live at Cal Expo on 1991-08-12"],["13-08-1991","Grateful Dead Live at Cal Expo on 1991-08-13"],["14-08-1991","Grateful Dead Live at Cal Expo on 1991-08-14"],["16-08-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-08-16"],["17-08-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-08-17"],["18-08-1991","Grateful Dead Live at Shoreline Amphitheatre on 1991-08-18"],["04-09-1991","Grateful Dead Live at Richfield Coliseum on 1991-09-04"],["05-09-1991","Grateful Dead Live at Richfield Coliseum on 1991-09-05"],["06-09-1991","Grateful Dead Live at Richfield Coliseum on 1991-09-06"],["08-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-08"],["09-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-09"],["10-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-10"],["12-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-12"],["13-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-13"],["14-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-14"],["16-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-16"],["17-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-17"],["18-09-1991","Grateful Dead Live at Madison Square Garden on 1991-09-18"],["20-09-1991","Grateful Dead Live at Boston Garden on 1991-09-20"],["21-09-1991","Grateful Dead Live at Boston Garden on 1991-09-21"],["22-09-1991","Grateful Dead Live at Boston Garden on 1991-09-22"],["24-09-1991","Grateful Dead Live at Boston Garden on 1991-09-24"],["25-09-1991","Grateful Dead Live at Boston Garden on 1991-09-25"],["26-09-1991","Grateful Dead Live at Boston Garden on 1991-09-26"],["04-10-1991","Grateful Dead Live at Rainbow Theatre on 1991-10-04"],["27-10-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-10-27"],["28-10-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-10-28"],["30-10-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-10-30"],["31-10-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-10-31"],["03-11-1991","Grateful Dead Live at Polo Field, Golden Gate Park on 1991-11-03"],["27-12-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-12-27"],["28-12-1991","Grateful Dead Live at Oakland-Alameda County Coliseum on 1991-12-28"],["30-12-1991","Grateful Dead Live at Oakland Coliseum Arena on 1991-12-30"],["31-12-1991","Grateful Dead Live at Oakland-Alameda County Coliseum Stadium on 1991-12-31"],["13-02-1992","Grateful Dead Live at Club Front on 1992-02-13"],["21-02-1992","Grateful Dead Live at Club Front Studio on 1992-02-21"],["22-02-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-02-22"],["23-02-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-02-23"],["24-02-1992","Grateful Dead Live at Oakland Coliseum Arena on 1992-02-24"],["01-03-1992","Grateful Dead Live at The Omni on 1992-03-01"],["02-03-1992","Grateful Dead Live at The Omni on 1992-03-02"],["03-03-1992","Grateful Dead Live at The Omni on 1992-03-03"],["05-03-1992","Grateful Dead Live at Hampton Coliseum on 1992-03-05"],["06-03-1992","Grateful Dead Live at Hampton Coliseum on 1992-03-06"],["08-03-1992","Grateful Dead Live at Capital Centre on 1992-03-08"],["09-03-1992","Grateful Dead Live at Capital Centre on 1992-03-09"],["11-03-1992","Grateful Dead Live at Nassau Coliseum on 1992-03-11"],["12-03-1992","Grateful Dead Live at Nassau Coliseum on 1992-03-12"],["13-03-1992","Grateful Dead Live at Nassau Coliseum on 1992-03-13"],["16-03-1992","Grateful Dead Live at The Spectrum on 1992-03-16"],["17-03-1992","Grateful Dead Live at The Spectrum on 1992-03-17"],["18-03-1992","Grateful Dead Live at The Spectrum on 1992-03-18"],["20-03-1992","Grateful Dead Live at Copps Coliseum on 1992-03-20"],["21-03-1992","Grateful Dead Live at Copps Coliseum on 1992-03-21"],["23-03-1992","Grateful Dead Live at The Palace on 1992-03-23"],["24-03-1992","Grateful Dead Live at The Palace on 1992-03-24"],["19-05-1992","Grateful Dead Live at Cal Expo on 1992-05-19"],["20-05-1992","Grateful Dead Live at Cal Expo on 1992-05-20"],["21-05-1992","Grateful Dead Live at Cal Expo on 1992-05-21"],["23-05-1992","Grateful Dead Live at Shoreline Ampitheater on 1992-05-23"],["24-05-1992","Grateful Dead Live at Shoreline Ampitheater on 1992-05-24"],["25-05-1992","Grateful Dead Live at Shoreline Amphitheatre on 1992-05-25"],["29-05-1992","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1992-05-29"],["30-05-1992","Grateful Dead Live at Sam Boyd Silver Bowl on 1992-05-30"],["31-05-1992","Grateful Dead Live at Sam Boyd Silver Bowl on 1992-05-31"],["06-06-1992","Grateful Dead Live at Rich Stadium on 1992-06-06"],["08-06-1992","Grateful Dead Live at Richfield Coliseum on 1992-06-08"],["09-06-1992","Grateful Dead Live at Richfield Coliseum on 1992-06-09"],["11-06-1992","Grateful Dead Live at Knickerbocker Arena on 1992-06-11"],["12-06-1992","Grateful Dead Live at Knickerbocker Arena on 1992-06-12"],["14-06-1992","Grateful Dead Live at Giants Stadium on 1992-06-14"],["15-06-1992","Grateful Dead Live at Giants Stadium on 1992-06-15"],["17-06-1992","Grateful Dead Live at Charlotte Coliseum on 1992-06-17"],["18-06-1992","Grateful Dead Live at Charlotte Coliseum on 1992-06-18"],["20-06-1992","Grateful Dead Live at RFK Stadium on 1992-06-20"],["22-06-1992","Grateful Dead Live at Star Lake Amphitheater on 1992-06-22"],["23-06-1992","Grateful Dead Live at Star Lake Ampitheater on 1992-06-23"],["25-06-1992","Grateful Dead Live at Soldier Field on 1992-06-25"],["26-06-1992","Grateful Dead Live at Soldier Field on 1992-06-26"],["28-06-1992","Grateful Dead Live at Deer Creek Music Center on 1992-06-28"],["29-06-1992","Grateful Dead Live at Deer Creek Music Center on 1992-06-29"],["01-07-1992","Grateful Dead Live at Buckeye Lake Music Center on 1992-07-01"],["02-12-1992","Grateful Dead Live at McNichols Sports Arena on 1992-12-02"],["03-12-1992","Grateful Dead Live at McNichols Sports Arena on 1992-12-03"],["05-12-1992","Grateful Dead Live at Compton Terrace Amphitheatre on 1992-12-05"],["06-12-1992","Grateful Dead Live at Compton Terrace Amphitheatre on 1992-12-06"],["11-12-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-12-11"],["12-12-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-12-12"],["13-12-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-12-13"],["16-12-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-12-16"],["17-12-1992","Grateful Dead Live at Oakland-Alameda County Coliseum on 1992-12-17"],["24-01-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-01-24"],["25-01-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-01-25"],["26-01-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-01-26"],["10-02-1993","Grateful Dead Live at Club Front on 1993-02-10"],["21-02-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-02-21"],["22-02-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-02-22"],["23-02-1993","Grateful Dead Live at Oakland Coliseum Arena on 1993-02-23"],["09-03-1993","Grateful Dead Live at Rosemont Horizon on 1993-03-09"],["10-03-1993","Grateful Dead Live at Rosemont Horizon on 1993-03-10"],["11-03-1993","Grateful Dead Live at Rosemont Horizon on 1993-03-11"],["14-03-1993","Grateful Dead Live at Richfield Coliseum on 1993-03-14"],["16-03-1993","Grateful Dead Live at Capital Centre on 1993-03-16"],["17-03-1993","Grateful Dead Live at Capital Centre on 1993-03-17"],["18-03-1993","Grateful Dead Live at Capital Centre on 1993-03-18"],["20-03-1993","Grateful Dead Live at The Omni on 1993-03-20"],["21-03-1993","Grateful Dead Live at The Omni on 1993-03-21"],["22-03-1993","Grateful Dead Live at The Omni on 1993-03-22"],["24-03-1993","Grateful Dead Live at Dean Smith Center, UNC on 1993-03-24"],["25-03-1993","Grateful Dead Live at Dean Smith Center on 1993-03-25"],["27-03-1993","Grateful Dead Live at Knickerbocker Arena on 1993-03-27"],["28-03-1993","Grateful Dead Live at Knickerbocker Arena on 1993-03-28"],["29-03-1993","Grateful Dead Live at Knickerbocker Arena on 1993-03-29"],["31-03-1993","Grateful Dead Live at Nassau Coliseum on 1993-03-31"],["01-04-1993","Grateful Dead Live at Nassau Coliseum on 1993-04-01"],["02-04-1993","Grateful Dead Live at Nassau Coliseum on 1993-04-02"],["04-04-1993","Grateful Dead Live at Nassau Coliseum on 1993-04-04"],["05-04-1993","Grateful Dead Live at Nassau Coliseum on 1993-04-05"],["14-05-1993","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1993-05-14"],["15-05-1993","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1993-05-15"],["16-05-1993","Grateful Dead Live at Sam Boyd Silver Bowl on 1993-05-16"],["21-05-1993","Grateful Dead Live at Shoreline Amphitheatre on 1993-05-21"],["22-05-1993","Grateful Dead Live at Shoreline Amphitheatre on 1993-05-22"],["23-05-1993","Grateful Dead Live at Shoreline Amphitheatre on 1993-05-23"],["25-05-1993","Grateful Dead Cal Expo 1993-05-25"],["26-05-1993","Grateful Dead Live at Cal Expo on 1993-05-26"],["27-05-1993","Grateful Dead Live at Cal Expo on 1993-05-27"],["05-06-1993","Grateful Dead Live at Giants Stadium on 1993-06-05"],["06-06-1993","Grateful Dead Live at Giants Stadium on 1993-06-06"],["08-06-1993","Grateful Dead Live at The Palace on 1993-06-08"],["09-06-1993","Grateful Dead Live at The Palace on 1993-06-09"],["11-06-1993","Grateful Dead Live at Buckeye Lake Music Center on 1993-06-11"],["13-06-1993","Grateful Dead Live at Rich Stadium on 1993-06-13"],["15-06-1993","Grateful Dead Live at Freedom Hall on 1993-06-15"],["16-06-1993","Grateful Dead Live at Freedom Hall on 1993-06-16"],["18-06-1993","Grateful Dead Live at Soldier Field on 1993-06-18"],["19-06-1993","Grateful Dead Live at Soldier Field on 1993-06-19"],["21-06-1993","Grateful Dead Live at Deer Creek Music Center on 1993-06-21"],["22-06-1993","Grateful Dead Live at Deer Creek Music Center on 1993-06-22"],["23-06-1993","Grateful Dead Live at Deer Creek Music Center on 1993-06-23"],["25-06-1993","Grateful Dead Live at RFK Stadium on 1993-06-25"],["26-06-1993","Grateful Dead Live at RFK Stadium on 1993-06-26"],["21-08-1993","Grateful Dead Live at Autzen Stadium on 1993-08-21"],["22-08-1993","Grateful Dead Live at Autzen Stadium on 1993-08-22"],["25-08-1993","Grateful Dead Live at Shoreline Amphitheatre on 1993-08-25"],["26-08-1993","Grateful Dead Live at Shoreline Amphitheatre on 1993-08-26"],["27-08-1993","The Grateful Dead Live at Shoreline Amphitheatre on 1993-08-27"],["08-09-1993","Grateful Dead Live at Richfield Coliseum on 1993-09-08"],["09-09-1993","Grateful Dead Live at Richfield Coliseum on 1993-09-09"],["10-09-1993","Grateful Dead Live at Richfield Coliseum on 1993-09-10"],["12-09-1993","Grateful Dead Live at The Spectrum on 1993-09-12"],["13-09-1993","Grateful Dead Live at The Spectrum on 1993-09-13"],["14-09-1993","Grateful Dead Live at The Spectrum on 1993-09-14"],["16-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-16"],["17-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-17"],["18-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-18"],["20-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-20"],["21-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-21"],["22-09-1993","Grateful Dead Live at Madison Square Garden on 1993-09-22"],["24-09-1993","Grateful Dead Live at Boston Garden on 1993-09-24"],["25-09-1993","Grateful Dead Live at Boston Garden on 1993-09-25"],["26-09-1993","Grateful Dead Live at Boston Garden on 1993-09-26"],["28-09-1993","Grateful Dead Live at Boston Garden on 1993-09-28"],["29-09-1993","Grateful Dead Live at Boston Garden on 1993-09-29"],["30-09-1993","Grateful Dead Live at Boston Garden on 1993-09-30"],["08-12-1993","Grateful Dead Live at Sports Arena on 1993-12-08"],["09-12-1993","Grateful Dead Live at Sports Arena on 1993-12-09"],["10-12-1993","Grateful Dead Live at Sports Arena on 1993-12-10"],["12-12-1993","Grateful Dead Live at San Diego Sports Arena on 1993-12-12"],["13-12-1993","Grateful Dead Live at San Diego Sports Arena on 1993-12-13"],["17-12-1993","Grateful Dead Live at Oakland Coliseum Arena on 1993-12-17"],["18-12-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-12-18"],["19-12-1993","Grateful Dead Live at Oakland-Alameda County Coliseum on 1993-12-19"],["24-02-1994","Grateful Dead Live at Oakland County Coliseum* on 1994-02-24"],["25-02-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-02-25"],["26-02-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-02-26"],["27-02-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-02-27"],["04-03-1994","Grateful Dead Live at Desert Sky Pavilion on 1994-03-04"],["05-03-1994","Grateful Dead Live at Desert Sky Pavilion on 1994-03-05"],["06-03-1994","Grateful Dead Live at Desert Sky Pavilion on 1994-03-06"],["16-03-1994","Grateful Dead Live at Rosemont Horizon on 1994-03-16"],["17-03-1994","Grateful Dead Live at Rosemont Horizon on 1994-03-17"],["18-03-1994","Grateful Dead Live at Rosemont Horizon on 1994-03-18"],["20-03-1994","Grateful Dead Live at Richfield Coliseum on 1994-03-20"],["21-03-1994","Grateful Dead Live at Richfield Coliseum on 1994-03-21"],["23-03-1994","Grateful Dead Live at Nassau Coliseum on 1994-03-23"],["24-03-1994","Grateful Dead Live at Nassau Coliseum on 1994-03-24"],["25-03-1994","Grateful Dead Live at Nassau Coliseum on 1994-03-25"],["27-03-1994","Grateful Dead Live at Nassau Coliseum on 1994-03-27"],["28-03-1994","Grateful Dead Live at Nassau Coliseum on 1994-03-28"],["30-03-1994","Grateful Dead Live at The Omni on 1994-03-30"],["31-03-1994","Grateful Dead Live at The Omni on 1994-03-31"],["01-04-1994","Grateful Dead Live at The Omni on 1994-04-01"],["04-04-1994","Grateful Dead Live at Sports Arena on 1994-04-04"],["06-04-1994","Grateful Dead Live at Miami Arena on 1994-04-06"],["07-04-1994","Grateful Dead Live at Miami Arena on 1994-04-07"],["08-04-1994","Grateful Dead Live at Miami Arena on 1994-04-08"],["08-06-1994","Grateful Dead Live at Cal Expo on 1994-06-08"],["09-06-1994","Grateful Dead Live at Cal Expo on 1994-06-09"],["10-06-1994","Grateful Dead Live at Cal Expo on 1994-06-10"],["13-06-1994","Grateful Dead Live at Memorial Stadium on 1994-06-13"],["14-06-1994","Grateful Dead Live at Memorial Stadium on 1994-06-14"],["17-06-1994","Grateful Dead Live at Autzen Stadium, U. of Oregon on 1994-06-17"],["18-06-1994","Grateful Dead Live at Autzen Stadium, U. Of Oregon on 1994-06-18"],["19-06-1994","Grateful Dead Live at Autzen Stadium, U. of Oregon on 1994-06-19"],["24-06-1994","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1994-06-24"],["25-06-1994","Grateful Dead Live at Sam Boyd Silver Bowl, U.N.L.V. on 1994-06-25"],["26-06-1994","Grateful Dead Live at Sam Boyd Silver Bowl on 1994-06-26"],["01-07-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-07-01"],["02-07-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-07-02"],["03-07-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-07-03"],["13-07-1994","Grateful Dead Live at Franklin County Airport on 1994-07-13"],["16-07-1994","Grateful Dead Live at Robert F. Kennedy Stadium on 1994-07-16"],["17-07-1994","Grateful Dead Live at Robert F. Kennedy Stadium on 1994-07-17"],["19-07-1994","Grateful Dead Live at Deer Creek Music Center on 1994-07-19"],["20-07-1994","Grateful Dead Live at Deer Creek Music Center on 1994-07-20"],["21-07-1994","Grateful Dead Live at Deer Creek Amphitheater on 1994-07-21"],["23-07-1994","Grateful Dead Live at Soldier Field on 1994-07-23"],["24-07-1994","Grateful Dead Live at Soldier Field on 1994-07-24"],["26-07-1994","Grateful Dead Live at Riverport Amphitheatre on 1994-07-26"],["27-07-1994","Grateful Dead Live at Riverport Amphitheatre on 1994-07-27"],["29-07-1994","Grateful Dead Live at Buckeye Lake Music Center on 1994-07-29"],["31-07-1994","Grateful Dead Live at The Palace on 1994-07-31"],["01-08-1994","Grateful Dead Live at The Palace on 1994-08-01"],["03-08-1994","Grateful Dead Live at Giants Stadium on 1994-08-03"],["04-08-1994","Grateful Dead Live at Giants Stadium on 1994-08-04"],["16-09-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-09-16"],["17-09-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-09-17"],["18-09-1994","Grateful Dead Live at Shoreline Amphitheatre on 1994-09-18"],["27-09-1994","Grateful Dead Live at Boston Garden on 1994-09-27"],["28-09-1994","Grateful Dead Live at Boston Garden on 1994-09-28"],["29-09-1994","Grateful Dead Live at Boston Garden on 1994-09-29"],["01-10-1994","Grateful Dead Live at Boston Garden on 1994-10-01"],["02-10-1994","Grateful Dead Live at Boston Garden on 1994-10-02"],["03-10-1994","Grateful Dead Live at Boston Garden on 1994-10-03"],["05-10-1994","Grateful Dead Live at The Spectrum on 1994-10-05"],["06-10-1994","Grateful Dead Live at The Spectrum on 1994-10-06"],["07-10-1994","Grateful Dead Live at The Spectrum on 1994-10-07"],["09-10-1994","Grateful Dead Live at USAir Arena on 1994-10-09"],["10-10-1994","Grateful Dead Live at USAir Arena on 1994-10-10"],["11-10-1994","Grateful Dead Live at USAir Arena on 1994-10-11"],["13-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-13"],["14-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-14"],["15-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-15"],["17-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-17"],["18-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-18"],["19-10-1994","Grateful Dead Live at Madison Square Garden on 1994-10-19"],["29-11-1994","Grateful Dead Live at McNichols Sports Arena on 1994-11-29"],["30-11-1994","Grateful Dead Live at McNichols Sports Arena on 1994-11-30"],["01-12-1994","Grateful Dead Live at McNichols Sports Arena on 1994-12-01"],["08-12-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-12-08"],["09-12-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-12-09"],["11-12-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-12-11"],["12-12-1994","Grateful Dead Live at Oakland-Alameda County Coliseum on 1994-12-12"],["15-12-1994","Grateful Dead Live at Sports Arena on 1994-12-15"],["16-12-1994","Grateful Dead Live at Sports Arena on 1994-12-16"],["18-12-1994","Grateful Dead Live at Sports Arena on 1994-12-18"],["19-12-1994","Grateful Dead Live at Sports Arena on 1994-12-19"],["01-01-1995","Grateful Dead Live at Various on 1995-01-01"],["19-02-1995","Grateful Dead Live at Delta Center on 1995-02-19"],["20-02-1995","Grateful Dead Live at Delta Center on 1995-02-20"],["21-02-1995","Grateful Dead Live at Delta Center on 1995-02-21"],["24-02-1995","Grateful Dead Live at Oakland Coliseum Arena on 1995-02-24"],["25-02-1995","Grateful Dead Live at Oakland-Alameda County Coliseum on 1995-02-25"],["26-02-1995","Grateful Dead Live at Oakland-Alameda on 1995-02-26"],["17-03-1995","Grateful Dead Live at The Spectrum on 1995-03-17"],["18-03-1995","Grateful Dead Live at The Spectrum on 1995-03-18"],["19-03-1995","Grateful Dead Live at The Spectrum on 1995-03-19"],["22-03-1995","Grateful Dead Live at Charlotte Coliseum on 1995-03-22"],["23-03-1995","Grateful Dead Live at Charlotte Coliseum on 1995-03-23"],["24-03-1995","Grateful Dead Live at Charlotte Coliseum on 1995-03-24"],["26-03-1995","Grateful Dead Live at The Omni on 1995-03-26"],["27-03-1995","Grateful Dead Live at The Omni on 1995-03-27"],["28-03-1995","Grateful Dead Live at The Omni on 1995-03-28"],["29-03-1995","Grateful Dead Live at The Omni on 1995-03-29"],["30-03-1995","Grateful Dead Live at The Omni on 1995-03-30"],["01-04-1995","Grateful Dead Live at The Pyramid on 1995-04-01"],["02-04-1995","Grateful Dead Live at Pyramid Arena on 1995-04-02"],["04-04-1995","Grateful Dead Live at Jefferson Civic Center Coliseum on 1995-04-04"],["05-04-1995","Grateful Dead Live at Jefferson Civic Center Coliseum on 1995-04-05"],["07-04-1995","Grateful Dead Live at Tampa Stadium on 1995-04-07"],["19-05-1995","Grateful Dead Live at Sam Boyd Silver Bowl on 1995-05-19"],["20-05-1995","Grateful Dead Live at Sam Boyd Silver Bowl on 1995-05-20"],["21-05-1995","Grateful Dead Live at Sam Boyd Silver Bowl on 1995-05-21"],["24-05-1995","Grateful Dead Live at Memorial Stadium on 1995-05-24"],["25-05-1995","Grateful Dead Live at Memorial Stadium on 1995-05-25"],["26-05-1995","Grateful Dead Live at Memorial Stadium on 1995-05-26"],["28-05-1995","Grateful Dead Live at Portland Meadows on 1995-05-28"],["29-05-1995","Grateful Dead Live at Portland Meadows on 1995-05-29"],["02-06-1995","Grateful Dead Live at Shoreline Amphitheatre on 1995-06-02"],["03-06-1995","Grateful Dead Live at Shoreline Amphitheatre on 1995-06-03"],["04-06-1995","Grateful Dead Live at Shoreline Amphitheatre on 1995-06-04"],["15-06-1995","Grateful Dead Live at Franklin County Airport on 1995-06-15"],["18-06-1995","Grateful Dead Live at Giants Stadium on 1995-06-18"],["19-06-1995","Grateful Dead Live at Giants Stadium on 1995-06-19"],["21-06-1995","Grateful Dead Live at Knickerbocker Arena on 1995-06-21"],["22-06-1995","Grateful Dead Live at Knickerbocker Arena on 1995-06-22"],["24-06-1995","Grateful Dead Live at RFK Stadium on 1995-06-24"],["25-06-1995","Grateful Dead Live at RFK Stadium on 1995-06-25"],["27-06-1995","Grateful Dead Live at The Palace on 1995-06-27"],["28-06-1995","Grateful Dead Live at The Palace on 1995-06-28"],["30-06-1995","Grateful Dead Live at Three Rivers Stadium on 1995-06-30"],["02-07-1995","Grateful Dead Live at Deer Creek Music Center on 1995-07-02"],["05-07-1995","Grateful Dead Live at Riverport Amphitheater on 1995-07-05"],["06-07-1995","Grateful Dead Live at Riverport Amphitheater on 1995-07-06"],["08-07-1995","Grateful Dead Live at Soldier Field on 1995-07-08"],["09-07-1995","Grateful Dead Live at Soldier Field on 1995-07-09"]]

let tempArray = []

let colors = [      //RGB
    [232,232,75],   //zolty
    [240,258,53],   //pomaranczowy
    [95,225,69],    //zielony
    [69,205,225],   //blekitny
    [167,102,228],  //lawendowy
    [229,119,197]   //rozowy
]

document.getElementById("getNextShow").disabled = true
document.getElementById("getPrevShow").disabled = true


function setDate(){                 // musialem to rozdzielic bo konfliktowalo z szukaniem w przod/tyl
    dzien = document.getElementById("dzien").value
    miesiac = document.getElementById("miesiac").value
    rok = document.getElementById("rok").value
    date = rok + "-" + miesiac + "-" + dzien
    return date
}

function dateConverter(badDate){           //konwertuje z dd-mm-rrrr na rrrr-mm-dd
    return badDate.slice(6,10)+"-"+badDate.slice(3,5)+"-"+badDate.slice(0,2)
}

function badDateConverter(goodDate){            //konwertuje z rrrr-mm-dd na dd-mm-rrrr    1992-1-1

    if(goodDate[6]=="-"){
        goodDate = goodDate.slice(0,5)+"0"+goodDate.slice(5,goodDate.length)       // 1992-01-1
    }
    if(goodDate[9] == null){
        goodDate = goodDate.slice(0,8) + "0" + goodDate.slice(8,goodDate.length)        // tu dodaje zera standaryzuje length
    }
    
    let badDate = goodDate.slice(8,10)+"-"+goodDate.slice(5,7)+"-"+goodDate.slice(0,4) // 02-1-1992

    return badDate
}

async function fetchShow(date){      // date to data w formacie rrrr-mm-dd    fetch show fetchuje idenifiery i wgl, a getshowbydate

    let query = "https://archive.org/advancedsearch.php?q=grateful+dead+"+date+"&fl%5B%5D=avg_rating&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=100&page=1&output=json&save=yes"
    
    

    let data = await fetch(query)
    let res = await data.json()
    


    return res
}

async function fetchSongs(backup){


    if(backup == false){
        songArray = [[],[],[]]
    }

    let buildSongArray = [[],[],[]]     // klon songArray uzywany dobudowania tabelki bez zmieniania songarray
    
    let query = "https://archive.org/metadata/"+showID

    let data = await fetch(query)
    let res = await data.json()

    for(let i = 0; i < res.files.length; i++){ 

        if(res.files[i].length == null){  // skipuje pliki ktore nie maja length, mozliwe ze to wypeirdala tez piosenki
            continue
        }

        if(res.files[i].name.toLowerCase().includes(".mp3") == true && res.files[i].name.toLowerCase().includes("_vbr") == false ){

            buildSongArray[0].push(res.files[i].name)

            buildSongArray[1].push(res.files[i].title)

            buildSongArray[2].push(res.files[i].length)

        }
    }


    if(buildSongArray[2][0].includes(":")==false){
        for(let i=0; i<buildSongArray[0].length; i++){
            buildSongArray[2][i] = secondToMinute(buildSongArray[2][i])
        }
    }

    if(backup == false || backup == null){
        songArray = buildSongArray
    }


    return buildSongArray
}

async function setupShowTable(res, date){  // res to response z archiva. date data w rrrr-mm-dd

    //jesli wylosowane kolory sa te same, to odpal funkcje od nowa

    let color1ID = Math.floor(Math.random()*6)
    let color2ID = Math.floor(Math.random()*6)

    if(color1ID==color2ID){
        setupShowTable(res,date)
        return
    }

    let color1 = colors[color1ID]
    let color2 = colors[color2ID]



    // document.getElementById("playerContent").style.display = "none"



    typeFilter = document.getElementById("recordingType").value

    console.log(res)
    let sortedArray = sorter(res.response)

    //pre-check ile jest rekordow (wiem ze inefficient ale nie chcialo mi sie rozdzielac)

    let numRecords=0  //ile jest rekordow w tabeli

    for(let i=0; i<sortedArray.length; i++){

        if(sortedArray[i].identifier.toLowerCase().includes("sbd")==true||sortedArray[i].identifier.toLowerCase().includes("soundboard")==true||sortedArray[i].identifier.toLowerCase().includes("mtx")==true||sortedArray[i].identifier.toLowerCase().includes("matrix")==true||sortedArray[i].identifier.toLowerCase().includes("aud")==true||sortedArray[i].identifier.toLowerCase().includes("audience")==true||sortedArray[i].identifier.toLowerCase().includes("gd")==true){
            
            if(sortedArray[i].identifier.includes(date)==false){
                continue
            }
            numRecords++
        }
        
    }

    let iterNumRecords = numRecords



    //setup gradientu

    let dayOfTheWeek = new Date(rok+"-"+miesiac+"-"+dzien).getDay()

    switch(dayOfTheWeek){
        case 0:
            dayOfTheWeek = "Sunday"
            break
        case 1:
            dayOfTheWeek = "Monday"
            break
        case 2:
            dayOfTheWeek = "Tuesday"
            break
        case 3:
            dayOfTheWeek = "Wednesday"
            break
        case 4:
            dayOfTheWeek = "Thursday"
            break
        case 5:
            dayOfTheWeek = "Friday"
            break
        case 6:
            dayOfTheWeek = "Saturday"
            break
        
    }

    document.getElementById("showDate").textContent = sortedArray[0].title + ", " + dayOfTheWeek



    for(let i=0; i<sortedArray.length; i++){
        if(i==0){
            

            //         TABLE HEADER

            let typeCell = document.createElement("td")
            typeCell.textContent = "Recording Type"

            let idCell = document.createElement("td")
            idCell.textContent = "Archive Recording ID"

            let downloadsCell = document.createElement("td")
            downloadsCell.textContent = "Downloads"

            let ratingCell = document.createElement("td")
            ratingCell.textContent = "Avg rating"
            
            

            let tableRow = document.createElement("tr")

            tableRow.style.backgroundColor = "#fa1f0f"
            tableRow.style.color = "white"
            tableRow.style.cursor = "default"
 
            tableRow.appendChild(typeCell)
            tableRow.appendChild(idCell)
            tableRow.appendChild(downloadsCell)
            tableRow.appendChild(ratingCell)

            document.getElementById("resultsTable").appendChild(tableRow)

            //      TABLE HEADER
        }
        let tableRow = document.createElement("tr")
        tableRow.classList.add("showRecord")



        //z bomby odrzuc wszystko co nie jest koncertem gd (jakies ratdogi albo cos)
        if(sortedArray[i].identifier.toLowerCase().includes("gd")==false){
            console.log("pominalem bo to nie koncert gd - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
        }


        let typeCell = document.createElement("td")
        let audType
        if(sortedArray[i].identifier.toLowerCase().includes("sbd")==true||sortedArray[i].identifier.toLowerCase().includes("soundboard")==true){
            audType = "sbd"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("mtx")==true||sortedArray[i].identifier.toLowerCase().includes("matrix")==true){
            audType = "mtx"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("aud")==true||sortedArray[i].identifier.toLowerCase().includes("audience")==true){
            audType = "aud"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("gd")==true){
            audType = "unknown"
        }


        //jesli wybreany typ nagrania nie pasuje do typu z pliku to pomin jego dodawaanie do tabelki
        if(audType!=typeFilter && typeFilter!="any"){
            console.log("pominalem bo typ zly - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
            
        }
        typeCell.textContent = audType



        let idCell = document.createElement("td")
        if(sortedArray[i].identifier.includes(date.slice(2))==false){
            console.log("pominalem bo data zla - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
        }
        idCell.textContent = sortedArray[i].identifier
        idCell.classList.add("IDCell")



        let downloadsCell = document.createElement("td")
        downloadsCell.textContent = sortedArray[i].downloads



        let ratingCell = document.createElement("td")
        ratingCell.textContent = sortedArray[i].avg_rating

        
        

        tableRow.append(typeCell, idCell, downloadsCell, ratingCell)
        

        tableRow.addEventListener("click",(el)=>{
            console.log(el.target.parentNode.getElementsByClassName("IDCell")[0].textContent)
            showID = el.target.parentNode.getElementsByClassName("IDCell")[0].textContent 
            
        

            setupSongTable()

    

            let showLink = document.getElementById("showLink")

            showLink.href = "https://archive.org/details/"+showID

            showLink.innerText = "view this show on Archive"


            try{
                document.getElementsByClassName("tableRowActive")[0].classList.remove("tableRowActive")
            }catch{
                console.log("wypierdala blad przy usuwaniu tablerowactive")
            }


            el.target.parentNode.classList.add("tableRowActive")
            tableRow.classList.add("tableRowActive")

            // positionPlayer()
        })


        //fajne swiecenie siue juhuuuu   

        let endColorR = color1[0] + iterNumRecords/numRecords * (color2[0]-color1[0])
        let endColorG = color1[1] + iterNumRecords/numRecords * (color2[1]-color1[1])
        let endColorB = color1[2] + iterNumRecords/numRecords * (color2[2]-color1[2])

        tableRow.style.background = "rgb("+endColorR+","+endColorG+","+endColorB+")"

        iterNumRecords--


    

        document.getElementById("resultsTable").appendChild(tableRow)

        

        
    }

        
    if(document.getElementById("resultsTable").children.length==1 && direction!=null){

        getPrevNextShow(direction)
        return
    }
    if(document.getElementById("resultsTable").children.length==1 && direction==null){
        let notfound = document.createElement("tr")
        notfound.textContent = "no shows were found with applied filters"
        document.getElementById("resultsTable").appendChild(notfound)
    }

    direction = null



    loading()

}

async function setupSongTable(){

    
    let setupSongArray = await fetchSongs(true)

    let tabelka = document.getElementById("songTable")

    tabelka.innerHTML = ""

    //table header

    let hrTableRow = document.createElement("tr")
    

    let numberHeader = document.createElement("th")

    let nameHeader = document.createElement("th")
    nameHeader.textContent = "Song name"

    let timeHeader = document.createElement("th")
    timeHeader.textContent = "Length"
    timeHeader.style.padding = ".5em"

    let idHeader = document.createElement("th")
    idHeader.textContent = "Archive song ID"

    let queueHeader = document.createElement("th")
    queueHeader.textContent = "Queue"



    hrTableRow.append(numberHeader, nameHeader, timeHeader, idHeader, queueHeader)

    tabelka.append(hrTableRow)


    //song table

    for(let i = 0; i<setupSongArray[0].length; i++){
        let tableRow = document.createElement("tr")
        

        let songName = document.createElement("td")
        songName.id = "songTableName"
        songName.textContent = setupSongArray[1][i]
        
        let songOrder = document.createElement("td")
        songOrder.id = "songTableOrder"
        songOrder.textContent = i+1

        

        let songLength = document.createElement("td")
        songLength.id = "songTableLength"
        songLength.textContent = setupSongArray[2][i]

        let songID = document.createElement("td")
        songID.id = "songTableID"
        songID.textContent = setupSongArray[0][i]

        let queueAdd = document.createElement("td")
        queueAdd.id = showID + "/" + setupSongArray[0][i]

        queueAdd.textContent = "+"
        queueAdd.style.textAlign = "center"

        queueAdd.addEventListener("click", ()=>{
            queueAddFunc(queueAdd.id, songName.textContent, songLength.textContent)
        })

  
        let elementsArray = [songOrder, songName, songLength, songID]

        for(let i = 0; i < elementsArray.length; i++){
            elementsArray[i].addEventListener("click", async()=>{

                await fetchSongs(false)
    
                currentShowID = showID
    
                let tempSongID = Number(tableRow.querySelector("#songTableOrder").textContent)-1
    

                startSong(currentShowID, songArray[0][Number(tableRow.querySelector("#songTableOrder").textContent)-1], Number(tableRow.querySelector("#songTableOrder").textContent)-1)
                
            })
        }



        tableRow.append(songOrder, songName, songLength, songID, queueAdd)

        tabelka.append(tableRow)
    }

    queuePositioner()

}

function doWeHaveThisDate(date){        // sprawdza czy show z input fieldow jest w naszym showarray, useful przy szukaniu next/prev show

    let badDate = badDateConverter(date)

    for(let i=0; i<showArray.length; i++){
        

        if(Number(showArray[i][0].slice(6,10))>Number(badDate.slice(6,10))){
            return false
        }

        if(showArray[i][0]==badDate){
            return true
        }
    }

    return false
}

async function getShowByDate(date){ // fetch show fetchuje idenifiery i wgl, a getshowbydate jest parentem fetchshow i to on go wywoluje

    if(direction != null){
        if(doWeHaveThisDate(date)==false){
            getPrevNextShow(direction)
            return
        }
    }


    // wyczysc divy przed wlozeniem nastepnych danych
    clear()

    const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

    if(date.search(regex)!=0){


        if(dzien.toString().length==1 && dzien.toString()!="*"){
            dzien="0"+dzien
        }
        if(miesiac.toString().length==1 && miesiac.toString()!="*"){
            miesiac="0"+miesiac
        }

    }
    let res = await fetchShow(date)


    // triggeruje gdy direction jest juz ustalony (po kliknievciu przycisku)
    if((direction=="next"||direction=="prev")&&res.response.numFound==0){
        getPrevNextShow(direction)
        return
    }


    if(res.response.numFound == 0){
        document.getElementById("resultsTable").textContent = "no show was found on "+dzien+"-"+miesiac+"-"+rok
        loading()
        return
    }

    setupShowTable(res,date)

    // document.getElementById("showNotFound").style.display = "none"
}

async function getRandomShow(filter){
    
    clear()

    let randomDate

    //alltime
    if(filter==undefined){
        randomDate = dateConverter(showArray[Math.floor(Math.random()*showArray.length)][0])
    }

    //eras
    else if(isNaN(filter)==true){

        //zmeinna trzymajaca loopa w calosci
        let loop = true

        let startYear, endYear

        if(filter=="pigpen"){
            startYear = 1965
            endYear = 1971
        }else if(filter=="keith"){
            startYear = 1972
            endYear = 1979
        }else if(filter=="brent"){
            startYear = 1980
            endYear = 1990
        }else if(filter=="vince"){
            startYear = 1991
            endYear = 1995
        }else if(filter=="bruce"){
            startYear = 1991
            endYear = 1992
        }

        while(loop==true){
            randomDate = dateConverter(showArray[Math.floor(Math.random()*showArray.length)][0])
            
            if(Number(randomDate.slice(0,4))>=startYear && Number(randomDate.slice(0,4))<=endYear){

                loop=false
            }
        }
    }

    else if(isNaN(filter)==false){
        let loop = true

        while(loop==true){
            
            randomDate = dateConverter(showArray[Math.floor(Math.random()*showArray.length)][0])
            if(Number(randomDate.slice(0,4))==filter){

                loop = false
            }
        }
    }
    

    dzien = randomDate.slice(8,10)
    miesiac = randomDate.slice(5,7)
    rok = randomDate.slice(0,4)

    let res = await fetchShow(randomDate)

    setupShowTable(res, randomDate.slice(2))
}

async function getTodayShows(){
    let todayobj = new Date()

    
    let month = todayobj.getMonth()+1
    let day = todayobj.getDate()

    if((todayobj.getMonth()+1).toString().length==1){
        month = "0"+(todayobj.getMonth()+1)
    }
    if((todayobj.getDate()+1).toString().length==1){
        day = "0"+todayobj.getDate()
    }

    let showcount = 0
    //szukanie matchy dla dzisiaj

    for(let i=0;i<showArray.length;i++){ //showArray jest w formacie dd mm rrrr
        

        if(showArray[i][0].slice(0,2) == day && showArray[i][0].slice(3,5) == month){
            let li = document.createElement("li")

            let venueString = (showArray[i][1]).replace("Grateful Dead Live at ", "") // usun pierwsza czesc
            const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/

            venueString = venueString.slice(0,venueString.search(regex)-4)
            

            li.textContent = showArray[i][0] + ", " + venueString

            li.classList.add("todayShowLink")

            li.addEventListener("click",async ()=>{
                loading()
                rok = showArray[i][0].slice(6,10)
                miesiac = month
                dzien = day
                await getShowByDate(dateConverter(showArray[i][0]))
            })

            document.getElementById("todayShowsList").appendChild(li)
            showcount++
        }
        
    }

    if(showcount==0){
        document.getElementById("todayShowsLinkContainer").innerText = "There were no shows played on this date (wow)"
    }





}

function loading(){
    if(loadingToggle==false){
        document.getElementById("uncleSamGif").style.height = "300px"

        //wylaczenie przyciskow aby uzytkownik nie spamowal
        for(let i=0;i<document.getElementsByClassName("formButtons").length;i++){
            document.getElementsByClassName("formButtons")[i].disabled = true
        }
        for(let i=0;i<document.getElementsByClassName("todayShowLink").length;i++){
            document.getElementsByClassName("todayShowLink")[i].style.pointerEvents = "none"
        }
        loadingToggle=true
        
    }else if(loadingToggle==true){
        document.getElementById("uncleSamGif").style.height = "0px"
        //wlaczenie przyciskow 
        for(let i=0;i<document.getElementsByClassName("formButtons").length;i++){
            document.getElementsByClassName("formButtons")[i].disabled = false
        }
        for(let i=0;i<document.getElementsByClassName("todayShowLink").length;i++){
            document.getElementsByClassName("todayShowLink")[i].style.pointerEvents = "auto"
        }
        loadingToggle=false
    }

}

async function getPrevNextShow(direction){  // direction - szukamy w tyl czy w przod



    // szukanie nastepnego dnia


    if(direction=="next"){
        dzien++
        if(dzien>31){
            dzien=1
            miesiac++
            if(miesiac>12){
                miesiac=1
                rok++
                if(rok==1980 &&miesiac==7&&dzien==10){
                    let divek = document.getElementById("arrayContainer")
                    for(let i=0;i<showArray.length;i++){
                        divek.textContent += showArray[i][0]
                    }
                }
            }
        }
    }
    if(direction=="prev"){
        console.log(dzien)
        dzien--
        if(dzien<1){
            dzien=31
            miesiac--
            if(miesiac<1){
                miesiac=12
                rok--
            }
        }
    }

    if(dzien.toString().length==1){
        dzien = "0"+dzien
    }

    if(miesiac.toString().length==1){
        miesiac = "0"+miesiac
    }



    await getShowByDate(rok+"-"+miesiac+"-"+dzien)
}

function sorter(arrayToSort){       //arrayToSort - array do posortowania   


    let unsortedArray = []
    let sortedArray = []    // array z posortowanymi showami
    

    //umieszczenie wszystkich elementow do arraya aby pozniej mozna bylo je usuwac

    // uwaga: sorter jest przeznaczony do obiektow json ktore sa zwracane rzez query w intenret archive,
    // wiec [array].numFound to liczba itemkow w arrayu, a .docs[i] to dany itemek iterowany

    for(let i=0; i<arrayToSort.numFound; i++){
        unsortedArray.push(arrayToSort.docs[i])
    }

    for(let i=0; i<unsortedArray.length; i++){
        if(i==0){                                    //tylko za pierwszym razem
            sortedArray.push(unsortedArray[i])
            continue
        }
        if(unsortedArray[i]==undefined){
            continue
        }
        if(unsortedArray[i].downloads>sortedArray[0].downloads){      //kiedy jest wieksze od najwiekszego w sorted
            sortedArray.unshift(unsortedArray[i])
            continue
        }
        if(unsortedArray[i].downloads < sortedArray[sortedArray.length-1].downloads){     //kiedy jest mniejsze od najmniejszego w sorted
            sortedArray.push(unsortedArray[i])
            continue
        }
        else{                                                           //kiedy jest jakos w srodku
            for(let j=sortedArray.length-1; j>=0;j--){    // j=1 poniewaz przy wykonywaniu tej petli jest zapewniony przynajmniej jeden element w arrayu
                if(unsortedArray[i].downloads>sortedArray[j].downloads){      //kiedy unsroted jest wieksze od current sorted - idzie do gory
                    continue
                }
                if(unsortedArray[i].downloads<=sortedArray[j].downloads){       //kiedy unsorted jest 
                    sortedArray.splice(j+1,0,unsortedArray[i])
                    break
                }
            }
        }
    }

    return sortedArray
}

function clear(){
    //czyszczenie tabeli oraz playera

    document.getElementById("resultsTable").innerHTML = ""
    // document.getElementById("playerContent").src = ""
    document.getElementById("showDate").textContent = ""
}

function disableAllChoices(){
    for(let i=0; i<3; i++){
        document.getElementsByClassName("choiceContent")[i].style.display = "none";
        document.getElementsByClassName("choiceTab")[i].classList.remove("choiceActive")
    }
}

for(let i=0; i<3; i++){
    let btnID = document.getElementsByClassName("choiceTab")[i].id
    let tabID = btnID.slice(0,btnID.indexOf("Button"))+"Content"
    document.getElementById(btnID).addEventListener("click",()=>{
        disableAllChoices()
        document.getElementById(btnID).classList.add("choiceActive")
        document.getElementById(tabID).style.display = "block"
    })
}

document.getElementById("getPrevShow").addEventListener("click", async ()=>{
    direction = "prev"
    loading()
    getPrevNextShow(direction)
})

document.getElementById("getNextShow").addEventListener("click", async (el)=>{
    direction = "next"
    loading()
    getPrevNextShow(direction)
})

document.getElementById("getShowButton").addEventListener("click", async ()=>{
    loading()
    getShowByDate(setDate())
})

document.getElementById("allChoiceButton").addEventListener("click", async ()=>{
    loading()
    getRandomShow()
})

document.getElementById("eraChoiceButton").addEventListener("click", async ()=>{
    loading()
    getRandomShow(document.getElementById("eraSelect").value)
})

document.getElementById("yearChoiceButton").addEventListener("click", async ()=>{
    loading()
    getRandomShow(document.getElementById("yearSelect").value)
})

window.onload = ()=>{
    getTodayShows()
}

// sekcja playera

let currentSong = document.getElementById("currentSong")
let preloadSong = document.getElementById("preloadSong")

let progressDiv = document.getElementById("progressDiv")
let infoDiv = document.getElementById("infoDiv")

let currentSongID = 0

document.getElementById("volumeControl").addEventListener("change", ()=>{
    currentSong.volume = document.getElementById("volumeControl").value
})

document.getElementById("prevButton").addEventListener("click", ()=>{
    if(currentSong.currentTime<5 && currentSongID!=0){
        // currentSong.pause()

        //if currsongid <0 then play currsongid0
        startSong(currentShowID,songArray[0][currentSongID-1], currentSongID-1)
        
    }
    if(currentSong.currentTime>=5){

        startSong(currentShowID, songArray[0][currentSongID], currentSongID)
    }
})

document.getElementById("nextButton").addEventListener("click", ()=>{

    if(queueArray[0].length > 0){
        startSong(queueArray[0][0],queueArray[1][0],queueArray[2][0])
        return
    }

    if(currentSongID!=songArray[0].length-1)

    startSong(currentShowID,songArray[0][currentSongID+1], currentSongID+1)
})

document.getElementById("pausePlayButton").addEventListener("click", ()=>{
    if(currentSong.paused == true){
        playSong()
    }
    else{
        stopSong()
    }
})

document.getElementById("rewind10").addEventListener("click", ()=>{
    if(currentSong.currentTime>10){
        currentSong.currentTime-=10
    }
})

document.getElementById("skip10").addEventListener("click", ()=>{
    if(currentSong.currentTime<minuteToSecond(document.getElementById("totalTime").textContent)-11){
        currentSong.currentTime+=10
    }
})

currentSong.addEventListener("ended", ()=>{

    if(queueArray[0].length > 0){
        startSong(queueArray[0][0],queueArray[1][0],queueArray[2][0])
        return
    }

    currentSongID++
    startSong(currentShowID, songArray[0][currentSongID], currentSongID)

    

})

function minuteToSecond(minute){    // z 4:40 do 280
    return Number(minute.slice(0, minute.indexOf(":"))) * 60 + Number(minute.slice(minute.indexOf(":")+1))
}

function secondToMinute(seconds){       // z 280 do 4:40
    let secs = Math.floor(seconds % 60)

    if(secs < 10){                // doddawawnie 0 przed sekuyndami 0:04 zamiast 0:4
        secs = "0" + secs
    }

    return Math.floor(seconds/60) + ":" + secs
}

function startSong(currShowID, songID, tableOrder){


    if(currShowID.includes("/") == true){    //odpala sie tylko gdy piosenka jest queued

        

        currentSong.src = "https://archive.org/download/"+currShowID
      
        document.getElementById("totalTime").textContent = queueArray[2][0]
        document.getElementById("songProgressBar").max = minuteToSecond(queueArray[2][0])
        infoDiv.textContent = queueArray[1][0]


        
        

        playSong()


        removeFromQueue(queueArray[3][0])
        return
    }

    currentSong.src = "https://archive.org/download/"+currShowID+"/"+songID


    currentSongID = Number(tableOrder)

    if(songArray[0].length-1 > currentSongID){
        preloadNextSong()
    }

    document.getElementById("totalTime").textContent = songArray[2][currentSongID]
    document.getElementById("songProgressBar").max = minuteToSecond(songArray[2][currentSongID])
    infoDiv.textContent = songArray[1][currentSongID]

    playSong()
}

function preloadNextSong(){
    preloadSong.src = "https://archive.org/download/"+currentShowID+"/"+songArray[0][currentSongID+1]
    preloadSong.load()
    
    console.log("preloaded: " + "https://archive.org/download/"+currentShowID+"/"+songArray[0][currentSongID+1])
}

function playSong(){
    currentSong.play()
    document.getElementById("pausePlayButton").textContent = " II "

    
    timeKeeper()
}

function stopSong(){
    currentSong.pause()
    document.getElementById("pausePlayButton").textContent = " ▶ "
}

function timeKeeper(){

    document.getElementById("currentTime").textContent = secondToMinute(currentSong.currentTime)

    document.getElementById("songProgressBar").value = Math.floor(currentSong.currentTime)

    if(currentSong.paused == false){
        setTimeout(timeKeeper, 1000)
    }
}

//kolejka VVVV


let queueDiv = document.getElementById("queueDiv")

let queueTable = document.getElementById("queueTable")

function queuePositioner(){
    let controlDivHeight = document.getElementById("controlDiv").offsetHeight
    document.getElementById("queueDiv").style.bottom = controlDivHeight + "px"
}

function queueAddFunc(showSongID, songName, songLength){

    queueArray[0].push(showSongID)
    queueArray[1].push(songName)
    queueArray[2].push(songLength)

    addToQueueTable()
}

function addToQueueTable(){
    
    let tableRow = document.createElement("tr")

    let queueID = Date.now().toString().slice(-8)

    tableRow.id = queueID


    queueArray[3][queueArray[0].length-1] = queueID


    let nameCell = document.createElement("td")
    nameCell.textContent = queueArray[1][queueArray[1].length-1]


    let duraCell = document.createElement("td")
    duraCell.textContent = queueArray[2][queueArray[2].length-1]

    let remCell = document.createElement("td")
    remCell.textContent = " - "

    remCell.addEventListener("click", ()=>{
        removeFromQueue(queueID)
    })

    tableRow.append(nameCell, duraCell, remCell)

    queueTable.append(tableRow)
}

function removeFromQueue(queueID){


    document.getElementById(queueID).remove()

    for(let i = 0; i < queueArray[0].length; i++){
        if(queueArray[3][i] == queueID){


            queueArray[0].splice(i, 1)
            queueArray[1].splice(i, 1)
            queueArray[2].splice(i, 1)
            queueArray[3].splice(i, 1)
        }
    }
}