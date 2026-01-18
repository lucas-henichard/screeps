let creep = new Creep();
let game = new Game();


// ---------------- kept functions ---------------- 
function collectNearestSource()
{
    var sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
    {
        creep.moveTo(sources[0]);
    }
}


function transferEnergy()
{
    if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    {
        creep.moveTo(Game.spawns['Spawn1']);
    }
}

// Spawn creep of role harvester 
Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );

Game.spawns['Spawn1'].spawnCreep( [WORK, MOVE, MOVE], "Harvester1", {memory: {role: 'harvester'}});
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], "upgrader1", {memory: {role: 'upgrader'}});

// self explanatory
Game.creeps['Harvester1'].suicide()


// memory cleanup
for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

// auto spawn 
if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

// Safe mode (defensive mode)
Game.spawns['Spawn1'].room.controller.activateSafeMode();

// Spawn tower
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
