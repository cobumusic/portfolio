import "@/styles/core.scss";

export default function ResumeLayout({children}) {
  return <html lang="en">
    <head >
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"/>
    </head>
    <body>
      {children}
    </body>
  </html>;
}
