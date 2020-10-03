// 2D Texture - NativeUI Picker example v98
// by Kavin kumar  :: @rbkavin


// When loading assets, find() has been changed to findFirst() and findAll()
// Load the modules
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Patches = require('Patches');
const Persistence = require('Persistence');
const d = require("Diagnostics");


(async function () {

  // Geting 
  const userScope = Persistence.userScope;

  var data = {
    index: 0
  };


  try {
    // Attempt to get the stored data and if successful...
    const result = await userScope.get('data');

    // only when there is data we assign to the data object
    if (result != null) {
      data = result;
    }


  } catch (error) {
    // If not successful output a failure message with the error returned

  }

  // Getting the textures to be used
  const assets = await Promise.all([
    Textures.findFirst('icon_1'),
    Textures.findFirst('icon_2'),
    Textures.findFirst('icon_3'),
  ]);




  const texture0 = assets[0];
  const texture1 = assets[1];
  const texture2 = assets[2];

  const picker = NativeUI.picker;

  var index = 0;
  const selection = 0;

  const configuration = {

    selectedIndex: data.index,

    items: [{
        image_texture: texture0
      },
      {
        image_texture: texture1
      },
      {
        image_texture: texture2
      }
    ]

  };

  picker.configure(configuration);
  picker.visible = true;

  //sending the default value to the patch 
  Patches.inputs.setScalar('selection', data.index);

  picker.selectedIndex.monitor().subscribe(function (index) {

    //sending the selected index value to the patch 
    Patches.inputs.setScalar('selection', index.newValue);

    // assigning the selected index to the data to be stored
    data.index = index.newValue;

    //Saving the index selected 
    userScope.set('data', data);

  });

})();