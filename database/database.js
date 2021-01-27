const {createConnection} = require('mysql');

const con = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'GetTicket'
});
/*
con.query("CREATE TABLE Admin_Profile(ID INT PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(50) NOT NULL UNIQUE KEY, Email VARCHAR(50)  NOT NULL UNIQUE KEY, Password VARCHAR(60) NOT NULL, Role ENUM('ADMIN', 'EDITOR') NOT NULL, Name VARCHAR(70) NOT NULL UNIQUE KEY, Phone VARCHAR(11) NOT NULL, Birthday DATE NOT NULL, Address TEXT NOT NULL, Registered DATETIME NOT NULL, Status BOOLEAN NOT NULL) COLLATE Latin1_general_cs", (err, result, fields) => {
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE Movies(Movie_ID INT PRIMARY KEY AUTO_INCREMENT, Movie_Poster LONGBLOB NOT NULL, Title VARCHAR(50) NOT NULL UNIQUE KEY, Description VARCHAR(300) NOT NULL, Duration TIME NOT NULL, Genre VARCHAR(50) NOT NULL, Release_Date Date NOT NULL, Status ENUM('Inactive','Coming Soon','Now Showing') NOT NULL) COLLATE Latin1_general_cs", (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE Branch(Mall_ID INT PRIMARY KEY AUTO_INCREMENT, Mall_Name VARCHAR(50) NOT NULL UNIQUE KEY, Num_Cinemahall INT NOT NULL, Status BOOLEAN NOT NULL) COLLATE Latin1_general_cs", (err,result,fields) =>{
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

con.query("CREATE TABLE Cinema(Cinema_ID INT PRIMARY KEY AUTO_INCREMENT, Mall_Name VARCHAR(50) NOT NULL, Cinema_Hall VARCHAR(20) NOT NULL UNIQUE KEY, Num_Seats INT NOT NULL, Status BOOLEAN NOT NULL, INDEX (Mall_Name)) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("INSERT INTO `getticket`.`cinema` (`Cinema_ID`, `Mall_Name`, `Cinema_Hall`, `Num_Seats`, `Status`) VALUES (NULL, 'Manila', 'Hall 1', '74', '1');", (err,result,fields) =>{
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

con.query(" ALTER TABLE `cinema` ADD CONSTRAINT `Branch_name` FOREIGN KEY (`Mall_Name`) REFERENCES `getticket`.`branch`(`Mall_Name`) ON DELETE RESTRICT ON UPDATE RESTRICT;", (err,result,fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});


con.query("CREATE TABLE Showtimes(Showtime_ID INT PRIMARY KEY AUTO_INCREMENT, Title VARCHAR(50) NOT NULL, Duration TIME NOT NULL, Showdate DATE NOT NULL, Showtime TIME NOT NULL, Mall_Name VARCHAR(50) NOT NULL, Cinema_Hall VARCHAR(20) NOT NULL UNIQUE KEY, Seats INT NOT NULL, Price FLOAT NOT NULL, INDEX (Mall_Name), INDEX (Title)) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }S
    return console.log(result);
});

con.query("ALTER TABLE `showtimes` ADD CONSTRAINT `cinemahall` FOREIGN KEY (`Cinema_Hall`) REFERENCES `getticket`.`cinema`(`Cinema_Hall`) ON DELETE RESTRICT ON UPDATE RESTRICT;", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("ALTER TABLE `showtimes` ADD CONSTRAINT `mallname` FOREIGN KEY (`Mall_Name`) REFERENCES `getticket`.`branch`(`Mall_Name`) ON DELETE RESTRICT ON UPDATE RESTRICT;", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("ALTER TABLE `showtimes` ADD CONSTRAINT `movietitle` FOREIGN KEY (`Title`) REFERENCES `getticket`.`movies`(`Title`) ON DELETE RESTRICT ON UPDATE RESTRICT;", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE Movies_Log(ID INT PRIMARY KEY AUTO_INCREMENT, Modified_Datetime DATETIME NOT NULL, Action VARCHAR(20) NOT NULL, Modified_Movie INT NOT NULL, Modified_Title VARCHAR(50) NOT NULL) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE Showtimes_Log(ID INT PRIMARY KEY AUTO_INCREMENT, Action VARCHAR(50) NOT NULL, Modified_Datetime DATETIME NOT NULL, Modified_Mall VARCHAR(50) NOT NULL, Modified_Cinema VARCHAR(50) NOT NULL, Modified_Movie VARCHAR(50) NOT NULL) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE Reservations(Reservation_ID INT PRIMARY KEY AUTO_INCREMENT, Customer VARCHAR(100) NOT NULL, Title VARCHAR(50) NOT NULL, Movie_Showtime DATETIME NOT NULL, Num_Tickets INT NOT NULL, Status ENUM('Reserved','Pending','Cancelled') NOT NULL) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});

con.query("CREATE TABLE User_Profile(User_ID INT PRIMARY KEY AUTO_INCREMENT, Username VARCHAR(50) NOT NULL UNIQUE KEY, Email VARCHAR(50) NOT NULL UNIQUE KEY, Password VARCHAR(60) NOT NULL, Contact VARCHAR(11) NOT NULL, Fname VARCHAR(50) NOT NULL, Lname VARCHAR(50) NOT NULL, Birthday DATE NOT NULL, Address TEXT NOT NULL  ) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});
*/
con.query("CREATE TABLE Transaction_History(Transaction_ID INT PRIMARY KEY AUTO_INCREMENT, Transaction_User VARCHAR(50) NOT NULL, Transaction_Date DATE NOT NULL , Title VARCHAR(30) NOT NULL , Showtime TIME NOT NULL, Num_Tickets INT NOT NULL, Status ENUM('Reserved','Pending','Cancelled') NOT NULL  ) COLLATE Latin1_general_cs", (err,result,fields) =>{
 if (err){
        return console.log(err);
    }
    return console.log(result);
});
con.query("CREATE TABLE Shopping_cart(Cart_ID INT PRIMARY KEY AUTO_INCREMENT, Cart_User VARCHAR(50) NOT NULL , Title VARCHAR(30) NOT NULL, Cart_Time Time NOT NULL , Cart_Date Date NOT NULL, Num_Tickets INT NOT NULL, Price FLOAT NOT NULL  ) COLLATE Latin1_general_cs", (err,result,fields) =>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
});


module.exports = con;