export function makeTurn(game_field:Array<string|undefined>):number{
    let position_to_place:number|undefined = undefined
    while (position_to_place === undefined){
        const pos = Math.floor(Math.random()*9)
        if (!game_field[pos]){position_to_place=pos}
    }
    return position_to_place
}