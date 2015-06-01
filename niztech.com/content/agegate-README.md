<h1>ewinery-agegate-for-drupal-sites</h1>
<hr />
<div class="section">

<h2>Overview</h2>
<p>This module prompts the user for an age validator. If the user verifies his or her age is over 21, a cookie gets deposited with this information.</p>
<p><code>Developed by <a href="mailto:nazario@niztech.com">Nazario A. Ayala </a> (niztech.com). Feel free to ask if you have questions.</code></p>
</div>

<div class="section">
<h2>Installation</h2>
<p>Installation is simple. Treat the <code>agegate</code> folder as you would any other custom module. Place it in:</p>
<ol>
<li>Place the <code>agegate</code> folder in <code>/sites/all/modules/custom/</code></li>
<li>Login to Drupal as an administrator</li>
<li>Click on Modules</li>
<li>Find Agegate</li>
<li>Check the box and click 'Save Configuration'</li>
</ol>

<div class="section">
<h2>Configuration</h2>
<p>Although the Agegate will render at this point, the cookie will not work with eWinery if it is not configured for your site.</p>
<ol>
<li>Login to Drupal as an administrator</li>
<li>Click on Configuration</li>
<li>Click on Agegate Settings</li>
<li>Under General Settings find Cookie's Domain</li>
<li>Change the string to reflect your sites top level URL. Remember to keep the period (.) before the string</li>
<ul><strong>Valid</strong>
<li><code>.cambriawines.com</code></li>
<li><code>.spirecollection.com</code></li>
<li><code>.apple.com</code></li>
</ul>
<ul><strong>In-valid</strong>
<li><code>www.cambriawines.com</code></li>
<li><code>trade.cambriawines.com</code></li>
<li><code>cambriawines.com</code></li>
<li><code>.com</code></li>
</ul>
</ol>
</div>

<div class="section">
<h2>Customization</h2>
<p>This Agegate comes with some default styling but it in the event that the styling needs to change, it is possible to style the Agegate by targeting it in your sites css file.</p>
<ul>
<li>To affect the logo, first turn it on then target
<code>#agegate .agegate-logo{}</code>
</li>
<li>Change the button color
<code>#agegate .agegate-logo{}</code>
</li>
</ul>

<p>There are also some options that can be set in the configuration mentioned above.</p>
<ol>
<li><strong><code>DEBUG</code></strong> - If this is set to checked information is printed to the JS console. It should be left to unchecked on production sites as this can break IE.</li>
<li><strong><code>SITENAME</code></strong> - Human readable name of your site</li>
<li><strong><code>MESSAGE</code></strong> - Message displayed to the end user.<br><strong>NOTE:</strong> The message added here is wrapped in p tags</li>
<li><strong><code>SHOWLOGO</code></strong> - If checked the default site logo file will be, otherwise no image will be loaded.</li>
</ol>
</div>

<div class="section">
<h2>Other Info</h2>
<p>The Agegate relies on the jQuery library. Although this module was written for version 1.8 of the jQuery library. It works with version 1.4 which Drupal uses.</p>
<p>To install place the resources mentioned below on all the pages where one wishes the Agegate to appear.</p>
<ul>
<li>jQuery</li>
<li>jQuery JSON plug-in</li>
<li>jQuery Cookie plug-in</li>
</ul>

</div>
