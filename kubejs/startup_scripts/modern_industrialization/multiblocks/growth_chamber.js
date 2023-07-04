let GROWTH_CHAMBER;

MIMachineEvents.registerRecipeTypes(e => {
    GROWTH_CHAMBER = e.register('growth_chamber')
        .withItemInputs()
        .withItemOutputs();
});

MIMachineEvents.registerMachines(e => {

    const glass = e.memberOfBlock('minecraft:glass');
    const block = e.memberOfBlock('ad_astra:steel_plating');
    const grass = e.memberOfBlock('botania:vivid_grass');
    const sapling = e.memberOfBlock('twilightforest:transformation_sapling');
    const lamp = e.memberOfBlock('blockus:orange_redstone_lamp_lit');
    const growthChamberHatch = e.hatchOf('item_input', 'item_output', 'energy_input');

    const growthChamberShape = e.layeredShape('ad_astra:steel_plating', [
        //y=0      1      2
        [ ' BBB ', ' GGG ', ' GGG ', ' GGG ', ' GGG ', '     '],
        [ 'BRRRB', 'G   G', 'G   G', 'G   G', 'G   G', ' GGG '],
        [ 'BRRRB', 'G P G', 'G   G', 'G   G', 'G   G', ' GOG '],
        [ 'BRRRB', 'G   G', 'G   G', 'G   G', 'G   G', ' GGG '],
        [ ' B#B ', ' GGG ', ' GGG ', ' GGG ', ' GGG ', '     ']
    ])
        .key('B', block, growthChamberHatch)
        .key('R', grass, e.noHatch())
        .key('G', glass, e.noHatch())
        .key('P', sapling, e.noHatch())
        .key('O', lamp, e.noHatch())
        .build();

    e.simpleElectricCraftingMultiBlock(
        // General parameters
        "Growth Chamber", // English name
        "growth_chamber", // internal name
        GROWTH_CHAMBER, // recipe type
        growthChamberShape, // multiblock shape

        // REI Display configuration
        e.progressBar(77, 33, "triple_arrow"), e.efficiencyBar(48, 86), e.energyBar(14, 44),
        // REI Item inputs, item outputs, fluid inputs, fluid outputs
        itemInputs => itemInputs.addSlots(56, 35, 1, 1), 
        itemOutputs => itemOutputs.addSlot(102, 35),
        fluidInputs => {}, 
        fluidOutputs => {},
        
        /* Model Configuration */
        "steel_plate_casing", // casing of the controller
        "growth_chamber", // overlay folder
        true, // front overlay
        false, // top overlay
        false, // side overlay
    );
});
