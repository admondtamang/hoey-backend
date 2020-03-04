# Hoey Music App

Name: Admond Tamang
College id: 170192

## List of features

Mongoose
MongooseJS is an Object Document Mapper (ODM) translate documents in a MongoDB database to objects in the program.

Mongoose uses schemas to model the data an application wishes to store and manipulate in MongoDb. This includes features such as type casting, validation, query building, and more.

The main difference between a Mongoose and a native-MongoDB application is that a module containing the schema and model must be created in the models directory.

Reasons why I choose mongoose:
• MongooseJS provides an abstraction layer on top of MongoDB that eliminates the need to use named collections.
• Models in Mongoose perform the bulk of the work of establishing up default values for document properties and validating data.
• Functions may be attached to Models in MongooseJS. This allows for seamless incorporation of new functionality.
• Queries use function chaining rather than embedded mnemonics which result in code that is more flexible and readable, therefore more maintainable as well.

The net result of these is the simplification of database access from applications. The main disadvantage of Mongoose is that abstraction comes at the cost of performance compared to that of native MongoDB.

Schema used in project

User : In user entity it has four attribute with different data types and they are : user id email , password, admin . Here pasword is hash with a seceret key stored in .env file. The encryption key to ensure that each key is unique and unpredictable.
Admin and user are sperated using attribute admin. If admin attribute is true then the user is admin user else user is normal user.

Song: Song attribute contains schema as artist, comment, albums and its also attribute like title, link, duration, duration and year.

Artist: Artist is parent of albums. It has attributes like artistImage and artist name. Artist is parent of albums. One artist can have many albums in it.

Albums: Album is parent of song. In one albums there can have multiple songs.

To add user favorite song I have created attribute in array to store in songs which acts as many to many relationship. User can add many songs to the user schema in array.

##Tools & Technology
I have used nodejs to create local serve and MongoDD was used for creating database. It is reliable secure and fast.
Npm is a nodepackage manger. It allows us to add, update and uninstall dependency. Also Yarn a package manager by facebook was used to swiftly import dependency when npm slows the download.

##Conclusion:
Here MongooseDB was used as database and mongoose which is an mongodb object modeling were used to create database for my project. In my databse, different schema with its attributes were constructed. This database system was made to fetch all the data so we can have the record of it seeing the data we can take the future decision.
