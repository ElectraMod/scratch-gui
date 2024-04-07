const available = () => !!window.showSaveFilePicker;

const showSaveFilePicker = fileName => window.showSaveFilePicker({
    suggestedName: fileName,
    types: [
        {
            description: 'ElectraMod Project',
            accept: {
                'application/x.scratch.sb3': '.electra'
            }
        },
        {
            description: 'DinosaurMod Project',
            accept: {
                'application/x.scratch.sb3': '.dino'
            }
        },
        {
            description: 'Snail-IDE Project',
            accept: {
                'application/x.scratch.sb3': '.snail'
            }
        },
        {
            description: 'PenguinMod Project',
            accept: {
                'application/x.scratch.sb3': '.pmp'
            }
        },
        {
            description: 'Scratch 3.0 Project',
            accept: {
                'application/x.scratch.sb3': '.sb3'
            }
        }
    ],
    excludeAcceptAllOption: true
});

const showOpenFilePicker = async () => {
    const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [
            {
                description: 'ElectraMod Project',
                accept: {
                    'application/x.scratch.sb3': ['.electra']
                }
            },
            {
                description: 'DinosaurMod Project',
                accept: {
                    'application/x.scratch.sb3': ['.dino']
                }
            },
            {
                description: 'Snail-IDE Project',
                accept: {
                    'application/x.scratch.sb3': ['.snail']
                }
            },
            {
                description: 'PenguinMod Project',
                accept: {
                    'application/x.scratch.sb3': ['.pmp', '.pm']
                }
            },
            {
                description: 'Scratch Project',
                accept: {
                    'application/x.scratch.sb3': ['.sb3', '.sb2', '.sb']
                }
            }
        ]
    });
    return handle;
};

export default {
    available,
    showOpenFilePicker,
    showSaveFilePicker
};