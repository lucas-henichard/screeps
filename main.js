var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

const MIN_HARVESTERS = 1;


module.exports.loop = function ()
{
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if (harvesters.length < MIN_HARVESTERS)
    {
        
    }

    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
    }
}


function towerFromTuto()
{
    var tower = Game.getObjectById('473fc7c7ba524907b45fcf84');
    if(tower)
    {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES,
        {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure)
        {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile)
        {
            tower.attack(closestHostile);
        }
    }
}