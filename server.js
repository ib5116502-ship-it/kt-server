const express = require("express")
const mongoose = require("mongoose")

const Car = require("./models/Car")

const PORT = 4000;

const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/cars").then(() =>{
    console.log("Успешно подключение к БД" );
    
}).catch((error) =>{
    console.error("Ошибка при подключении к БД" + error);
    
})

app.get("/cars", async (req , res) =>{
    try {
        const cars = await Car.find()
        res.json(cars)
    } catch (error) {
        res.send("Ошибка при подключении:" + error)
    }
})


app.post('/addcar' , async (req , res) =>{
    const {name , title, description, price} = req.body
    try {
        const newCar = await Car.create({
            name , title, description, price
        })
        await newCar.save()
        res.send("Автомобиль добавлен успешно!")
    }catch (error){
        console.log("Ошибка при добавлении автомобиля!" + error);
        res.send("Ошибка при добавлении автомобиля!")
        
    }
});

app.put("/car/:id", async (req, res) => { 
    try { 
        const { id } = req.params 

        const { name, title, description, price } = req.body 
        console.log(id); 

        const updateCar = await Car.findByIdAndUpdate(id, {
           name, title, description, price
        });


        if(!updateCar){
          return res.send("Такого автомобиля не существует")
        }
    res.json(updateCar, "автомобиля обнавлен успешно") 
    } catch (error) { 
        console.log("ошибка при обновлениb автомобиля:" + error); 
    }
    


}) 


app.patch("/car/:id" , async (req , res)=>{ 
    try{ 
        const {id} = req.params 


        if(!carUpdate){
         res.send("Такого товара не существует")
        }
        

        const carUpdate = await Car.findByIdAndUpdate(id , {$set: req.body} , {new: true})
        
        res.json(carUpdate) 

    }catch(error) {
        console.log("ошибка при обновлениb товара:" + error); 
    }
}) 


app.delete("/car/:id", async (req, res) => {
    try { 
        const { id } = req.params 
        const car = await Car.findByIdAndDelete(id) 

        if (!car) { 
            res.send("Такого товара не существует")

        } 
        res.send("Товар успешно удален")

    } catch (error) { 
        res.send("Ошибка при удалении товара" + error) 
    } 
}) 

app.listen(PORT, () => { 
    console.log("Успешно подключение к серверу порт" + PORT); 
}) 