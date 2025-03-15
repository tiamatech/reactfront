"use strict";(()=>{var e={};e.id=409,e.ids=[409],e.modules={8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},33480:(e,t,r)=>{e.exports=r(75600)},54125:(e,t,r)=>{r.r(t),r.d(t,{config:()=>d,default:()=>m,routeModule:()=>u});var s={};r.r(s),r.d(s,{default:()=>c});var o=r(33480),a=r(8667),n=r(86435);let i=require("nodemailer");var p=r.n(i);async function c(e,t){if("POST"!==e.method)return t.status(405).json({message:"Method not allowed"});try{let{name:r,email:s,message:o}=e.body;if(!process.env.EMAIL_USER||!process.env.EMAIL_PASS)throw Error("Missing email configuration");let a=p().createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS},tls:{rejectUnauthorized:!1}});await a.verify();let n={from:`"Tiamat Tech Contact Form" <${process.env.EMAIL_USER}>`,to:"info@tiamatech.com",replyTo:s,subject:`New Contact Form Message from ${r}`,html:`
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${r}</p>
            <p><strong>Email:</strong> ${s}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${o}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from the Tiamat Tech website contact form.
          </p>
        </div>
      `,text:`
        New Contact Form Submission
        
        Name: ${r}
        Email: ${s}
        
        Message:
        ${o}
        
        Sent from Tiamat Tech website contact form
      `},i=await a.sendMail(n);t.status(200).json({message:"Email sent successfully",messageId:i.messageId})}catch(e){t.status(500).json({message:"Failed to send email",error:"Internal server error"})}}let m=(0,n.M)(s,"default"),d=(0,n.M)(s,"config"),u=new o.PagesAPIRouteModule({definition:{kind:a.A.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:s})},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},86435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=54125);module.exports=r})();