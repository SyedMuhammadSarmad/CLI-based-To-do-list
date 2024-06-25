import inquirer from "inquirer"
import chalk from "chalk"

let list : string[]= [];


let add = async () => {
    let {item}  = await inquirer.prompt([{
        name : "item",
        type : "input",
        message : "Enter item to add"
    }])
    list.push(item)
    console.log(list)
}

let update = async() =>{
    if(list.length != 0){
        let {index , newitem} = await inquirer.prompt([
            {
                name : "index",
                type : "list",
                message : "Select item to update",
                choices : list.map((item,index)=> ({name : item , value : index})),
            },

            {
                name : "newitem",
                type : "input",
                message : "Enter new item"
            },

        ])

        list[index] = newitem
        console.log(list)
    }
    else{
        console.log("empty list")
        return
    }
}

let dlt = async () => {
    if(list.length != 0){
        let {index} = await inquirer.prompt([
            {
                name : "index",
                type : "list",
                message : "Select item to update",
                choices : list.map((item,index)=> ({name : item , value : index})),
            },
        ])

        list.splice(index,1)
        console.log(list)
    }
    else{
        console.log("Empty list")
        return
    }
}

let view = () => {
    console.log(list)
}


const main = async()=>{

    while(true){
        let {Operations} = await inquirer.prompt([{
            name : "Operations",
            type : "list",
            message : "Select operations",
            choices : [
                chalk.green("Add") , 
                chalk.blue("Update") , 
                chalk.white("View") , 
                chalk.redBright("Delete"),
                chalk.red("Exit")
            ]
        }])

        switch (Operations) {
            case chalk.green("Add"):
                await add();
                break;
            case chalk.blue("Update"):
                await update();
                break;
            case chalk.white("View"):
                view();
                break;
            case chalk.redBright("Delete"):
                await dlt();
                break;
            case chalk.red("Exit"):
                console.log("Goodbye! Thank you.");
                return;
            default:
                console.log("Invalid operation");
        }

    }
}

main();
