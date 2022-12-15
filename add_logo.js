const Jimp = require("jimp");

const ORIGINAL_IMAGE = __dirname + "/500/1.png";

const LOGO = __dirname + "/og.png";

//save image name
const FILENAME = __dirname + "/500/" + "300" + ".png";

const main = async(a) => {

    const [image, logo] = await Promise.all([
        Jimp.read(a),
        Jimp.read(LOGO)
    ]).catch(err => {
        console.log(
            'no such file'
        )
    });
    // console.log(image);

    if (image) {

        logo.resize(logo.bitmap.width, Jimp.AUTO);

        const X = 6150;
        const Y = 4700;

        return image.composite(logo, X, Y, [{
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
        }]);
    };
};

const filechecker = async(a) => {

    let haserror = false;

    const isfile = await Promise.all([
        Jimp.read(a)
    ]).catch(err => {
        if (err) {
            haserror = true;
        }
    });
    return isfile;


}

// main(FILENAME);

// main(ORIGINAL_IMAGE).then(image => image.write(FILENAME));

// for (let i = 1; i < 500; i++) {
//     const file = __dirname + "/500/" + i.toString() + ".png";
//     const file_name = __dirname + "/500/" + i.toString() + ".png";
//     console.log(file);
//     const filecheck = filechecker(file);
//     // if (filecheck) {
//     // main(file).then(image => image.write(file_name));
//     // }
//     console.log(filecheck);
// }

const dothething = async() => {
    for (let i = 1; i < 2000; i++) {
        const file = __dirname + "/500/" + i.toString() + ".png";
        const file_name = __dirname + "/500/" + i.toString() + ".png";
        console.log(file);
        const filecheck = await filechecker(file);
        if (filecheck) {
            main(file).then(image => image.write(file_name));
        }
        console.log(filecheck);
    }
};

dothething();