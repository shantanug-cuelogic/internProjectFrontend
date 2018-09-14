import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

class Editor extends Component {
    state = {

        model: '<p><img src="burger-logo.png" style="width: 775px;" class="fr-fic fr-dib">On Wednesday, Apple announced its new iPhones, curiously giving the cheaper and more colorful iPhone XR <a href="https://www.theverge.com/2018/9/12/17833352/apple-iphone-xs-price-att-verizon-t-mobile-pre-order-date">a ship date</a> of over a month after the more luxe&nbsp;<a href="https://www.theverge.com/2018/9/13/17852912/iphone-xs-max-xr-features-best-worst-camera-smart-hdr-apple-price">iPhone XS and XS Max models</a> become available next Friday. Why didn&rsquo;t Apple release all three phones at once?</p><p>In fact, Apple&rsquo;s release pattern is exactly the opposite of what it did last year when it chose to release its more affordable phones, the iPhone 8 and iPhone 8 Plus,&nbsp;<a href="https://www.theverge.com/2017/9/12/16277566/apple-iphone-8-price-cost-us-international">just 10 days</a> after the Apple event in September, while the iPhone X wasn&rsquo;t&nbsp;<a href="https://www.theverge.com/2017/9/12/16269194/apple-iphone-x-price-release-date-shipping-delay">available until November</a>. This was due to&nbsp;<a href="https://www.theverge.com/2017/10/24/16533288/iphone-x-apple-shipping-problems-half-2017">OLED supply issues</a>, and iPhone X&nbsp;<a href="https://www.wsj.com/articles/apple-to-curtail-iphone-x-production-in-the-face-of-weak-demand-1517312098">sales initially suffered</a> for it.</p><aside>LCD SOFTWARE ISSUES MIGHT BE THE CULPRIT</aside><p>Reports that the iPhone XR, which starts at $749 and features a so-called Liquid Retina LCD display, was facing supply issues floated around over this past summer. In July,&nbsp;<a href="http://www.macotakara.jp/blog/rumor/entry-35399.html?_ga=2.216631892.312574277.1536876531-1227921161.1536876531">Japanese blog&nbsp;<em>Macotakara</em> reported</a> that supplier Japan Display had low yields in manufacturing the LCD panels. Ryan Reith, IDC&rsquo;s vice president of research on mobile devices, told&nbsp;<em>The Verge</em> in a phone interview that more specifically, it likely wasn&rsquo;t a hardware issue. &ldquo;Everything we&rsquo;ve been hearing, it&rsquo;s been an issue on the software side,&rdquo; he said, &ldquo;There&rsquo;s a lot of software involved with the LCD screen, as it&rsquo;s the first [LCD display] with a notch and full screen.&rdquo;</p><p>Reith added, &ldquo;Apple could not get enough of these displays. It&rsquo;s run into last-minute kinks with the contact manufacturer.&rdquo; He said that Apple has been in production for a while, but that the &ldquo;quality wasn&rsquo;t hitting what they needed.&rdquo; Apple has had to tweak the LCD screen through software engineering to improve the visuals, as well as get its manufacturer to cut the material into a notched shape.</p>'
    }

    config = {
        codeMirrorOptions: {
            tabSize: 4
        },
        
        videoDefaultDisplay: 'inline',
        videoAllowedTypes: ['mp4'],
        videoUpload: true,
        videoUploadMethod: 'POST',
        videoUploadParam: 'file_name',
        videoUploadURL: 'http://localhost:3000/editor/videoupload',

        imageUpload: true,
        imageUploadMethod: 'POST',
        imageUploadParam: 'file_name',
        imageUploadRemoteUrls: true,
        imageUploadURL: 'http://localhost:3000/editor/imageupload',

        fileUpload: true,
        fileUploadURL: 'http://localhost:3000/editor/fileupload',
        fileUploadMethod: 'POST',
        fileUploadParam: 'file_name',
        colorsDefaultTab: 'background',
        disableRightClick: true,
        codeMirror: false
    }

    handleModelChange = (model) => {
        this.setState({
            model: model
        });

        console.log(this.state.model);
    }
    render() {
        return (
            <div style={{marginTop:'10%'}}>
                <FroalaEditor tag='textarea'
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                    config={this.config}

                />
            </div>

        )
    }

}

export default Editor;