const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const fromHardcoded = ({ userId, username, name }) => ({
    image: `https://trampoline.turbowarp.org/avatars/${userId}`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: name || username
});

const fromHardcodedGithub = username => ({
    image: `https://github.com/${username}.png`,
    href: `https://github.com/${username}/`,
    text: username
});
const fromHardcodedNamed = username => ({
    image: `https://penguinmod.com/unknown_user.png`,
    href: "https://studio.penguinmod.com/credits.html#",
    text: username
});

const fromHardcodedDiscord = async userId => {
    const res = await fetch(`https://pmupdatereader.jeremygamer13.repl.co/user/${userId}`);
    const json = await res.json();
    return {
        image: json.avatarURL,
        text: json.username
    };
};

const addonDevelopers = [
    {
        userId: '34018398',
        username: 'Jeffalo'
    },
    {
        userId: '64184234',
        username: 'ErrorGamer2000'
    },
    {
        userId: '41616512',
        username: 'pufferfish101007'
    },
    {
        userId: '61409215',
        username: 'TheColaber'
    },
    {
        userId: '1882674',
        username: 'griffpatch'
    },
    {
        userId: '10817178',
        username: 'apple502j'
    },
    {
        userId: '16947341',
        username: '--Explosion--'
    },
    {
        userId: '14880401',
        username: 'Sheep_maker'
    },
    {
        userId: '9981676',
        username: 'NitroCipher'
    },
    {
        userId: '2561680',
        username: 'lisa_wolfgang'
    },
    {
        userId: '60000111',
        username: 'GDUcrash'
    },
    {
        userId: '4648559',
        username: 'World_Languages'
    },
    {
        userId: '17340565',
        username: 'GarboMuffin'
    },
    {
        userId: '5354974',
        username: 'Chrome_Cat'
    },
    {
        // actual ID is 34455896 but their avatar is the wrong resolution and looks really weird
        userId: '0',
        username: 'summerscar'
    },
    {
        userId: '55742784',
        username: 'RedGuy7'
    },
    {
        userId: '9636514',
        username: 'Tacodiva7729'
    },
    {
        userId: '14792872',
        username: '_nix'
    },
    {
        userId: '30323614',
        username: 'BarelySmooth'
    },
    {
        userId: '64691048',
        username: 'CST1229'
    },
    {
        userId: '12498592',
        username: 'LilyMakesThings'
    }
].map(fromHardcoded);

const pmDevelopers = [
    'enderhacker',
    'FreshPenguin112',
    'Ianyourgod',
    'JoshAtticus',
    'JeremyGamer13',
    'jwklong',
    'tnix100',
    'RedMan13',
    'SharkPool-SP',
    'showierdata9978'
].map(fromHardcodedGithub);

const pmPullRequestDevelopers = [
    'NexusKitten',
    'LilyMakesThings',
    'MikeDev101',
    'kokofixcomputers',
    'PPPDUD',
    'qbjl',
    'minidogg'
    // add more people probably
].map(fromHardcodedGithub);

const emDevelopers = [
    'Aness6040',
    'AshimeeAlt',
    'CharcoalAfterlife',
    'cicerorph',
    'FurryR',
    'lego7set',
    'Mistium'
].map(fromHardcodedGithub);

const emPullRequestDevelopers = [
    'Ianyourgod',
    'RedMan13',
    'jwklong'
    // add more people probably
].map(fromHardcodedGithub);


const pmApiDevelopers = [
    'JeremyGamer13',
    'RedMan13',
    'tnix100',
    'Ianyourgod',
    'JoshAtticus',
    'enderhacker'
].map(fromHardcodedGithub);

// todo: should translators be only named or...?
const pmTranslators = [
    {
        text: 'kolikiscool',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'Youh',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'n0name',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'a_pc',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'onetoanother',
        image: `https://trampoline.turbowarp.org/avatars/by-username/onetoanother`,
        href: "https://penguinmod.com/profile?user=onetoanother",
    },
    {
        text: 'NamelessCat',
        image: `https://trampoline.turbowarp.org/avatars/by-username/NamelessCat`,
        href: "https://penguinmod.com/profile?user=NamelessCat",
    },
    {
        text: 'Just-Noone',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Just-Noone`,
        href: "https://penguinmod.com/profile?user=Just-Noone",
    },
    {
        text: 'goose_but_smart',
        image: `https://trampoline.turbowarp.org/avatars/by-username/goose_but_smart`,
        href: "https://penguinmod.com/profile?user=goose_but_smart",
    },
    {
        text: 'Le_Blob77',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Le_Blob77`,
        href: "https://penguinmod.com/profile?user=Le_Blob77",
    },
    {
        text: 'MrRedstonia',
        image: `https://trampoline.turbowarp.org/avatars/by-username/MrRedstonia`,
        href: "https://penguinmod.com/profile?user=MrRedstonia",
    },
    {
        text: 'TheShovel',
        image: `https://trampoline.turbowarp.org/avatars/by-username/TheShovel`,
        href: "https://penguinmod.com/profile?user=TheShovel",
    },
    {
        text: 'SmolBoi37',
        image: `https://trampoline.turbowarp.org/avatars/by-username/SmolBoi37`,
        href: "https://penguinmod.com/profile?user=SmolBoi37",
    },
    {
        text: 'GigantTech',
        image: `https://trampoline.turbowarp.org/avatars/by-username/GigantTech`,
        href: "https://penguinmod.com/profile?user=GigantTech",
    },
    {
        text: 'hacker_anonimo',
        image: `https://trampoline.turbowarp.org/avatars/by-username/hacker_anonimo`,
        href: "https://penguinmod.com/profile?user=hacker_anonimo",
    },
    {
        text: 'zaaxd52',
        image: `https://trampoline.turbowarp.org/avatars/by-username/zaaxd52`,
        href: "https://penguinmod.com/profile?user=zaaxd52",
    },
    {
        text: 'G1nX',
        image: `https://trampoline.turbowarp.org/avatars/by-username/G1nX`,
        href: "https://penguinmod.com/profile?user=G1nX",
    },
    {
        text: 'FNFFortune',
        image: `https://trampoline.turbowarp.org/avatars/by-username/FNFFortune`,
        href: "https://penguinmod.com/profile?user=FNFFortune",
    },
    // has since left the server
    // possibly they have a new account, so replace the name & url if so
    {
        text: 'Gabberythethughunte',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://penguinmod.com/profile?user=Gabberythethughunte",
    },
    {
        text: 'keriyo',
        image: `https://trampoline.turbowarp.org/avatars/by-username/keriyo`,
        href: "https://penguinmod.com/profile?user=keriyo",
    },
    {
        text: 'DenPlayTS',
        image: `https://trampoline.turbowarp.org/avatars/by-username/DenPlayTS`,
        href: "https://penguinmod.com/profile?user=DenPlayTS",
    },
    {
        text: 'Tsalbre',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Tsalbre`,
        href: "https://penguinmod.com/profile?user=Tsalbre",
    },
    {
        text: 'MubiLop',
        image: `https://trampoline.turbowarp.org/avatars/by-username/MubiLop`,
        href: "https://penguinmod.com/profile?user=MubiLop",
    },
    {
        text: 'TLP136',
        image: `https://trampoline.turbowarp.org/avatars/by-username/TLP136`,
        href: "https://penguinmod.com/profile?user=TLP136",
    },
    {
        text: 'Cymock',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Cymock`,
        href: "https://penguinmod.com/profile?user=Cymock",
    },
    {
        text: 'ItzzEndr',
        image: `https://trampoline.turbowarp.org/avatars/by-username/ItzzEndr`,
        href: "https://penguinmod.com/profile?user=ItzzEndr",
    },
    {
        text: 'Capysussa',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Capysussa`,
        href: "https://penguinmod.com/profile?user=Capysussa",
    },
    // con-zie is now banned from PenguinMod
    {
        text: 'con-zie',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'ImNotScratchY_lolol',
        image: `https://trampoline.turbowarp.org/avatars/by-username/ImNotScratchY_lolol`,
        href: "https://penguinmod.com/profile?user=ImNotScratchY_lolol",
    },
    {
        text: 'justablock',
        image: `https://trampoline.turbowarp.org/avatars/by-username/justablock`,
        href: "https://penguinmod.com/profile?user=justablock",
    },
    {
        text: 'inventionpro',
        image: `https://trampoline.turbowarp.org/avatars/by-username/inventionpro`,
        href: "https://penguinmod.com/profile?user=inventionpro",
    },
    {
        text: 'SkyBuilder1717',
        image: `https://trampoline.turbowarp.org/avatars/by-username/SkyBuilder1717`,
        href: "https://penguinmod.com/profile?user=SkyBuilder1717",
    },
    {
        text: 'Parham1258',
        image: `https://avatars.githubusercontent.com/u/95162943?v=4`,
        href: "https://github.com/Parham1258",
    },
    {
        text: 'lem0n0fficial',
        image: `https://trampoline.turbowarp.org/avatars/by-username/lem0n0fficial`,
        href: "https://penguinmod.com/profile?user=lem0n0fficial",
    },
    {
        text: 'Oldcoinmania',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Oldcoinmania`,
        href: "https://penguinmod.com/profile?user=Oldcoinmania",
    },
    {
        text: 'mariocraft987',
        image: `https://avatars.githubusercontent.com/u/154646419?v=4`,
        href: "https://github.com/mariocraft987",
    },
];

const logoArtists = Promise.all([
    '593554048188416001'
].map(fromHardcodedDiscord));

const extensionDevelopers = [
    'GarboMuffin',
    'griffpatch',
    'DT-is-not-available',
    'Vadik1',
    'MikeDev101',
    'LilyMakesThings'
].map(fromHardcodedGithub);
const pmExtensionDevelopers = [
    'qbjl',
    'NexusKitten',
    'Gen1x-ALT',
    'SharkPool-SP',
    'DogeisCut', // listed as a collaborator on a SharkPool extension
    'David-Orangemoon',
    'pooiod',
    'WAYLIVES',
    'MrRedstonia',
    'MikeDev101',
    'BopShoes',
    'AlexSchoolOH',
    'Monochromasity',   
    'TheShovel',
    'skyhigh173',
    'Ruby-Devs',
    'oc9x97',
    'lego7set',
    'mariocraft987',
    'Ashimee'
].map(fromHardcodedGithub);

const emExtensionDevelopers = [
    {
        text: 'Aness6040',
        image: `https://avatars.githubusercontent.com/u/96918407?v=4`,
        href: "https://github.com/Aness6040",
    },
    {
        text: 'MubiLop',
        image: `https://trampoline.turbowarp.org/avatars/by-username/MubiLop`,
        href: "https://penguinmod.com/profile?user=MubiLop",
    },
    {
        text: 'Jul Mik',
        image: `https://trampoline.turbowarp.org/avatars/by-username/julmik6478`,
        href: "https://scratch.mit.edu/users/julmik6478/",
    },
    {
        text: 'MikeDev101',
        image: `https://avatars.githubusercontent.com/u/12957745?v=4`,
        href: "https://github.com/MikeDev101/",
    },
];

export default {
    addonDevelopers: shuffle(addonDevelopers),
    pmDevelopers: shuffle(pmDevelopers),
    emDevelopers: shuffle(emDevelopers),
    logoArtists: shuffle(logoArtists),
    extensionDevelopers: shuffle(extensionDevelopers),
    pmExtensionDevelopers: shuffle(pmExtensionDevelopers),
    emExtensionDevelopers: shuffle(emExtensionDevelopers),
    pmApiDevelopers: shuffle(pmApiDevelopers),
    pmTranslators: shuffle(pmTranslators),
    pmPullRequestDevelopers: shuffle(pmPullRequestDevelopers),
    emPullRequestDevelopers: shuffle(emPullRequestDevelopers)
};
