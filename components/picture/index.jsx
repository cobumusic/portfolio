import React from "react";


export function StrapiPicture({className = "", picture, alt = "", loading = "lazy", sizes = "100vw"}) {
  let srcsets = [];
  let extensions = {};
  if (picture?.formats){
    //group formats by extension
    for (const [key, format] of Object.entries(picture.formats)){
      if (!extensions[format.ext]){
        extensions[format.ext] = [];
      }
      extensions[format.ext].push(format);
    }

    //each extension becomes a <source> tag
    for (const [key, extension] of Object.entries(extensions)){
      srcsets.push({
        key,
        type: `image/${key?.replace(".", "")}`,
        attribute: extension.map((size) => `${size.url} ${size.width}w`).join(","),
      });
    }
  }

  //try to load webp images first
  srcsets = srcsets.sort((a, b) => {
    if (a.key === ".webp"){
      return -1;
    }
    if (b.key === ".webp"){
      return 1;
    }
    return 0;
  });

  return (
    <picture className={className}>
      {srcsets.map((srcset, idx) => <source key={srcset.key} sizes={sizes} srcSet={srcset.attribute} type={srcset.type}></source>)}
      <img src={picture?.url} alt={alt} loading={loading}/>
    </picture>
  );
}



export default function Picture({base, alt = "", exts, loading, widths, background = "#00000000", sizes = ""}) {
  if (exts[0] === "svg"){
    return (
      <img
        style={{backgroundColor: background}}
        src={`${base}.svg`}
        alt={alt}
        loading={loading}
      />
    );
  }
  return (
    <picture style={{backgroundColor: background}}>
      { exts.map((ext) => {
        let srcset = widths.map((width) => {
          return `${base }-${ width }w.${ ext } ${ width }w,`;
        }).join("");
        return <source key={ext} srcSet={srcset} sizes={sizes} type={`image/${ext}`}></source>;
      })}
      <img src={`${base}.${exts[exts.length - 1]}`} alt={alt} loading={loading}/>
    </picture>
  );
}
