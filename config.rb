# Get the directory that this configuration file exists in
curDir = File.dirname(__FILE__)
dir = File.join( curDir, 'YOUR_APP_NAME' )

# Load the sencha-touch framework automatically.
load File.join(dir, 'touch', 'resources', 'themes')

# Compass configurations
sass_path = File.join(dir, 'resources', 'sass')
css_path = File.join(dir, 'resources', 'css')
fonts_dir = File.join(dir, 'resources', 'sass', 'stylesheets', 'fonts')

# Require any additional compass plugins here.
images_dir = File.join(dir, 'resources', 'images')

output_style = :compressed
environment = :production
