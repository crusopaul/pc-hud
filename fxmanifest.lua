description 'A hud system for pc-needs.'
version '0.0.3'
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

shared_scripts {
    '@es_extended/imports.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}

client_scripts {
    'client/main.lua',
}

dependencies {
    'pc-needs',
}

ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/assets/*.js',
    'web/build/assets/*.css',
}