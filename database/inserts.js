const {createConnection} = require('mysql');

const con = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'GetTicket'
});

con.query("CREATE TRIGGER Insertlog_Movie AFTER INSERT ON movies FOR EACH ROW INSERT INTO movies_log VALUES (NULL, NOW(), 'INSERT', NEW.Movie_ID, NEW.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TRIGGER Deletelog_Movie AFTER DELETE ON movies FOR EACH ROW INSERT INTO movies_log VALUES (NULL, NOW(), 'DELETE', OLD.Movie_ID, OLD.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TRIGGER Updatelog_Movie AFTER UPDATE ON movies FOR EACH ROW INSERT INTO movies_log VALUES (NULL, NOW(), 'UPDATED', NEW.Movie_ID, NEW.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TRIGGER Insertlog_Showtime AFTER INSERT ON showtimes FOR EACH ROW INSERT INTO showtimes_log VALUE (NULL, 'INSERT', NOW(), NEW.Mall_Name, NEW.Cinema_Hall, NEW.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TRIGGER Deletelog_Showtime AFTER DELETE ON showtimes FOR EACH ROW INSERT INTO showtimes_log VALUE (NULL, 'DELETE', NOW(), OLD.Mall_Name, OLD.Cinema_Hall, OLD.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TRIGGER Updatelog_Showtime AFTER UPDATE ON showtimes FOR EACH ROW INSERT INTO showtimes_log VALUE (NULL, 'DELETE', NOW(), NEW.Mall_Name, NEW.Cinema_Hall, NEW.Title);", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `movies`(`Movie_ID`, `Movie_Poster`, `Title`, `Description`, `Duration`, `Genre`, `Release_Date`, `Status`) VALUES (NULL,LOAD_FILE('C:/Projects/Database/images/Poster1.jpg'),'R.I.P.D','Testing Action Pack Movie','01:30:00','Action Adventure','2022-01-24','Coming Soon')", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `movies`(`Movie_ID`, `Movie_Poster`, `Title`, `Description`, `Duration`, `Genre`, `Release_Date`, `Status`) VALUES (NULL,LOAD_FILE('C:/Projects/Database/images/Poster2.jpg'),'Toy Story 3','Testing Kid Adventure Pack Movie','01:00:00','Adventure','2000-01-24','Now Showing')", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `movies`(`Movie_ID`, `Movie_Poster`, `Title`, `Description`, `Duration`, `Genre`, `Release_Date`, `Status`) VALUES (NULL,LOAD_FILE('C:/Projects/Database/images/Poster3.jpg'),'Thor','Testing Thoror Adventure Pack Movie','02:00:00','Action','2002-05-14','Inactive')", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO Admin_Profile(ID, Username, Email, Password, Role, Name, Phone, Birthday, Address, Registered, Status) VALUES (NULL,'admin', 'mhiguel@gmail.com', '$2a$10$5YqOZNd4qeMlKpWdPKEIa.AKsHwiB8yDHf.mTsrAfgt/dqSvEBeom', 'ADMIN', 'Mhiguel Gabriel De Nava', '12345678911', '12-12-12', '1234 Nicodemus St. Tondo, Manila', '2020-08-11 16:00:00', '1')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO Admin_Profile(ID, Username, Email, Password, Role, Name, Phone, Birthday, Address, Registered, Status) VALUES (NULL,'editor', 'mhiguelbusiness@gmail.com', '$2a$10$5YqOZNd4qeMlKpWdPKEIa.AKsHwiB8yDHf.mTsrAfgt/dqSvEBeom', 'EDITOR', 'Roronoa Zoro', '12345678900', '12-11-12', '1234 Batong Bahay St. Ermita, Manila', '2020-08-11 12:20:00', '1')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO Admin_Profile(ID, Username, Email, Password, Role, Name, Phone, Birthday, Address, Registered, Status) VALUES (NULL,'editor1', 'mhiguelbusiness@gmail.com', '$2a$10$5YqOZNd4qeMlKpWdPKEIa.AKsHwiB8yDHf.mTsrAfgt/dqSvEBeom', 'EDITOR', 'Roronoa Zoro', '12345678900', '12-11-12', '1234 Ilalim ng Tulay St. Sta.Mesa, Manila', '2020-08-11 12:20:00', '0')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`branch` (`Mall_ID`, `Mall_Name`, `Num_Cinemahall`, `Status`) VALUES (NULL, 'Manila', '5', '1');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`branch` (`Mall_ID`, `Mall_Name`, `Num_Cinemahall`, `Status`) VALUES (NULL, 'Cavite', '3', '1');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`branch` (`Mall_ID`, `Mall_Name`, `Num_Cinemahall`, `Status`) VALUES (NULL, 'Laguna', '2', '0');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`cinema` (`Cinema_ID`, `Mall_Name`, `Cinema_Hall`, `Num_Seats`, `Status`) VALUES (NULL, 'Manila', 'MHall 1', '74', '1'),(NULL, 'Manila', 'Hall 2', '74', '1'),(NULL, 'Manila', 'Hall 3', '74', '1'),(NULL, 'Manila', 'Hall 4', '74', '1'),(NULL, 'Manila', 'Hall 5', '74', '0');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`cinema` (`Cinema_ID`, `Mall_Name`, `Cinema_Hall`, `Num_Seats`, `Status`) VALUES (NULL, 'Cavite', 'CHall 1', '74', '1'),(NULL, 'Manila', 'CHall 2', '75', '0'),(NULL, 'Cavite', 'CHall 3', '50', '0');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`cinema` (`Cinema_ID`, `Mall_Name`, `Cinema_Hall`, `Num_Seats`, `Status`) VALUES (NULL, 'Laguna', 'LHall 1', '25', '1'),(NULL, 'Laguna', 'LHall 2', '25', '0');", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `user_profile`(`User_ID`, `Username`, `Email`, `Password`, `Contact`, `Fname`, `Lname`, `Birthday`, `Address`) VALUES (NULL,'RoronoaZoro','Testing@gmail.com','$2a$10$3W190WH2CA.r/XsH3Zv6DudQg/RHLzHabjk2oyA7AlTRIzilUXohq','09152323321','Roronoa','Zoro','1995-09-02','123 Sunny and Merry St. One,Piece')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `user_profile`(`User_ID`, `Username`, `Email`, `Password`, `Contact`, `Fname`, `Lname`, `Birthday`, `Address`) VALUES (NULL,'FannyNanny','Testing@gmail.com','$2a$10$3W190WH2CA.r/XsH3Zv6DudQg/RHLzHabjk2oyA7AlTRIzilUXohq','09152323321','Fanny','Nanny','1992-05-23','123 Merry go round St. Star,City')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `transaction_history`(`Transaction_ID`, `Transaction_Date`, `Title`, `Showtime`, `Num_Tickets`, `Status`) VALUES (NULL,'2021-01-16','Toy Story 3','17:35:12','3','1')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `transaction_history`(`Transaction_ID`, `Transaction_Date`, `Title`, `Showtime`, `Num_Tickets`, `Status`) VALUES (NULL,'2021-01-14','Thor','15:45:12','2','1')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `transaction_history`(`Transaction_ID`, `Transaction_Date`, `Title`, `Showtime`, `Num_Tickets`, `Status`) VALUES (NULL,'2021-01-14','R.I.P.D','11:45:12','2','0')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `shopping_cart`(`Cart_ID`, `Title`, `Cart_Time`, `Cart_Date`, `Num_Tickets`, `Price`) VALUES (NULL,'Thor','15:45:12','2021-01-14','2','500.00')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `shopping_cart`(`Cart_ID`, `Title`, `Cart_Time`, `Cart_Date`, `Num_Tickets`, `Price`) VALUES (NULL,'Toy Story 3','17:35:12','2021-01-16','3','300.00')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `shopping_cart`(`Cart_ID`, `Title`, `Cart_Time`, `Cart_Date`, `Num_Tickets`, `Price`) VALUES (NULL,'R.I.P.D','11:45:12','2021-01-14','2','450.00')", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

module.exports = con;