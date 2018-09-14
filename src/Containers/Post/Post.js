import React, { Component } from 'react';
import { Typography, Paper, withStyles } from '@material-ui/core';
import renderHTML from 'react-render-html';


const style = theme => ({

    HeaderContainer: {
        marginTop: '10%',
        height: '70px'
    },

    PostContainer: {
        marginTop: '5%',
    }

})

class Post extends Component {


    render() {
        const { classes } = this.props;
        let content = '<p><img src="burger-logo.png" style="width: 775px;" class="fr-fic fr-dib">On Wednesday, Apple announced its new iPhones, curiously giving the cheaper and more colorful iPhone XR <a href="https://www.theverge.com/2018/9/12/17833352/apple-iphone-xs-price-att-verizon-t-mobile-pre-order-date">a ship date</a> of over a month after the more luxe&nbsp;<a href="https://www.theverge.com/2018/9/13/17852912/iphone-xs-max-xr-features-best-worst-camera-smart-hdr-apple-price">iPhone XS and XS Max models</a> become available next Friday. Why didn&rsquo;t Apple release all three phones at once?</p><p>In fact, Apple&rsquo;s release pattern is exactly the opposite of what it did last year when it chose to release its more affordable phones, the iPhone 8 and iPhone 8 Plus,&nbsp;<a href="https://www.theverge.com/2017/9/12/16277566/apple-iphone-8-price-cost-us-international">just 10 days</a> after the Apple event in September, while the iPhone X wasn&rsquo;t&nbsp;<a href="https://www.theverge.com/2017/9/12/16269194/apple-iphone-x-price-release-date-shipping-delay">available until November</a>. This was due to&nbsp;<a href="https://www.theverge.com/2017/10/24/16533288/iphone-x-apple-shipping-problems-half-2017">OLED supply issues</a>, and iPhone X&nbsp;<a href="https://www.wsj.com/articles/apple-to-curtail-iphone-x-production-in-the-face-of-weak-demand-1517312098">sales initially suffered</a> for it.</p><aside>LCD SOFTWARE ISSUES MIGHT BE THE CULPRIT</aside><p>Reports that the iPhone XR, which starts at $749 and features a so-called Liquid Retina LCD display, was facing supply issues floated around over this past summer. In July,&nbsp;<a href="http://www.macotakara.jp/blog/rumor/entry-35399.html?_ga=2.216631892.312574277.1536876531-1227921161.1536876531">Japanese blog&nbsp;<em>Macotakara</em> reported</a> that supplier Japan Display had low yields in manufacturing the LCD panels. Ryan Reith, IDC&rsquo;s vice president of research on mobile devices, told&nbsp;<em>The Verge</em> in a phone interview that more specifically, it likely wasn&rsquo;t a hardware issue. &ldquo;Everything we&rsquo;ve been hearing, it&rsquo;s been an issue on the software side,&rdquo; he said, &ldquo;There&rsquo;s a lot of software involved with the LCD screen, as it&rsquo;s the first [LCD display] with a notch and full screen.&rdquo;</p><p>Reith added, &ldquo;Apple could not get enough of these displays. It&rsquo;s run into last-minute kinks with the contact manufacturer.&rdquo; He said that Apple has been in production for a while, but that the &ldquo;quality wasn&rsquo;t hitting what they needed.&rdquo; Apple has had to tweak the LCD screen through software engineering to improve the visuals, as well as get its manufacturer to cut the material into a notched shape.</p>';
        return (
            <div>
                <Paper>
                    <div className={classes.HeaderContainer}>
                        <Typography variant="title"> Post title </Typography>
                    </div>
                </Paper>
                <Paper>
                    <div className={classes.PostContainer}>
                        {renderHTML(content)}
                    </div>
                </Paper>
            </div>



        );
    }
}

export default withStyles(style)(Post);