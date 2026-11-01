// Redesigned by telegram.dog/TheFirstSpeedster at https://www.npmjs.com/package/@googledrive/index
// Updated with Vidstack Player (Native Chromecast, AirPlay, and absolute-path VTT subtitles)
function init() {
    document.siteName = $('title').html();
    var html = `<header>
   <div id="nav">
   </div>
</header>
<div>
<div id="content" style="padding-top: ${UI.header_padding}px;${UI.fixed_footer ?' padding-bottom: clamp(170px, 100%, 300px);': ''}">
</div>
<div class="modal fade" id="SearchModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="SearchModelLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="SearchModelLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body" id="modal-body-space">
      </div>
      <div class="modal-footer" id="modal-body-space-buttons">
      </div>
    </div>
  </div>
</div>
<br>
<footer class="footer mt-auto py-3 text-muted ${UI.footer_style_class}" style="${UI.fixed_footer ?'position: fixed; ': ''}left: 0; bottom: 0; width: 100%; color: white; z-index: 9999;${UI.hide_footer ? ' display:none;': ' display:block;'}"> <div class="container" style="width: auto; padding: 0 10px;"> <p class="float-end"> <a href="#">Back to top</a> </p> ${UI.credit ? '<p>Redesigned with <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="red" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /> </svg> by <a href="https://www.npmjs.com/package/@googledrive/index" target="_blank">TheFirstSpeedster</a>, based on Open Source Softwares.</p>' : ''} <p>© ${UI.copyright_year} - <a href=" ${UI.company_link}" target="_blank"> ${UI.company_name}</a>, All Rights Reserved.</p> </div> </footer>
  `;
    $('body').html(html);
}

const Os = {
    isWindows: navigator.platform.toUpperCase().indexOf('WIN') > -1,
    isMac: navigator.platform.toUpperCase().indexOf('MAC') > -1,
    isMacLike: /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    isIos: /(iPhone|iPod|iPad)/i.test(navigator.platform),
    isMobile: /Android|webOS|iPhone|iPad|iPod|iOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

function getDocumentHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function gdidecode(str) {
    var gdijsorg_0x5579 = ['join', 'toString', '114773LJlqPi', 'charCodeAt', '1evaKJu', '128429mQiVMM', '179727icrnig', '1276161MsgKkV', 'map', '111987FmCZVm', '6IEPbgT', '1924817UdCjIN', '328673bHHLnC', '14sGLkvR'];
    var gdijsorg_0x22bf03 = gdijsorg_0x47d3;
    (function(_0x2015a9, _0x2d2e6f) {
        var _0x194131 = gdijsorg_0x47d3;
        while (!![]) {
            try {
                var _0x50490c = parseInt(_0x194131(0x167)) * -parseInt(_0x194131(0x165)) + parseInt(_0x194131(0x160)) + parseInt(_0x194131(0x15e)) + -parseInt(_0x194131(0x161)) * -parseInt(_0x194131(0x15f)) + parseInt(_0x194131(0x162)) * -parseInt(_0x194131(0x168)) + -parseInt(_0x194131(0x16a)) + parseInt(_0x194131(0x169));
                if (_0x50490c === _0x2d2e6f) break;
                else _0x2015a9['push'](_0x2015a9['shift']());
            } catch (_0x157d6c) {
                _0x2015a9['push'](_0x2015a9['shift']());
            }
        }
    }(gdijsorg_0x5579, 0xf40cd));

    function gdijsorg_0x47d3(_0x4aefd5, _0x2d1551) {
        _0x4aefd5 = _0x4aefd5 - 0x15e;
        var _0x557938 = gdijsorg_0x5579[_0x4aefd5];
        return _0x557938;
    }
    return decodeURIComponent(atob(str)['split']('')[gdijsorg_0x22bf03(0x16b)](function(_0x1cdc7a) {
        var _0x416153 = gdijsorg_0x22bf03;
        return '%' + ('00' + _0x1cdc7a[_0x416153(0x166)](0x0)[_0x416153(0x164)](0x10))['slice'](-0x2);
    })[gdijsorg_0x22bf03(0x163)](''));
}

function render(path) {
    if (path.indexOf("?") > 0) {
        path = path.substr(0, path.indexOf("?"));
    }
    title(path);
    nav(path);
    var reg = /\/\d+:$/g;
    if (window.MODEL.is_search_page) {
        window.scroll_status = {
            event_bound: false,
            loading_lock: false
        };
        render_search_result_list();
    } else if (path.match(reg) || path.substr(-1) == '/') {
        window.scroll_status = {
            event_bound: false,
            loading_lock: false
        };
        list(path);
    } else {
        file(path);
    }
}

function title(path) {
    path = decodeURI(path);
    var cur = window.current_drive_order || 0;
    var drive_name = window.drive_names[cur];
    path = path.replace(`/${cur}:`, '');
    var model = window.MODEL;
    if (model.is_search_page)
        $('title').html(`${drive_name} - Search results for ${model.q} `);
    else
        $('title').html(`${drive_name} - ${path}`);
}

function nav(path) {
    var model = window.MODEL;
    var html = "";
    var cur = window.current_drive_order || 0;
    html += `<nav class="navbar navbar-expand-lg${UI.fixed_header ?' fixed-top': ''} ${UI.header_style_class}">
    <div class="container-fluid">
  <a class="navbar-brand" href="/">${UI.logo_image ? '<img border="0" alt="'+UI.company_name+'" src="'+UI.logo_link_name+'" height="'+UI.logo_height+'" width="'+UI.logo_width+'">' : UI.logo_link_name}</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="/${cur}:/">${UI.nav_link_1}</a>
      </li>`;
    var names = window.drive_names;
    var drive_name = window.drive_names[cur];

    html += `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${drive_name}</a><div class="dropdown-menu" aria-labelledby="navbarDropdown">`;
    names.forEach((name, idx) => {
        html += `<a class="dropdown-item"  href="/${idx}:/">${name}</a>`;
    });
    html += `</div></li>`;

    html += `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${UI.nav_link_3}</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item"  href="/">> Home</a>`;

    if (!model.is_search_page) {
        var arr = path.trim('/').split('/');
        var p = '/';
        if (arr.length > 1) {
            for (var i in arr) {
                var an = arr[i];
                n1 = decodeURIComponent(an);
                n2 = n1.replace(/\?.+/g, "$'")
                if (n2.length > 15) {
                    n = n2.slice(0, 5) + '...';
                } else {
                    n = n2.slice(0, 15);
                }
                p += an + '/';
                var ext = p.split('.').pop().toLowerCase();
                if ("|mp3/|aac/|wma/|wpl/|aif/|cda/|mpa/|wav/|ogg/|mp4/|mkv/|mov/|flac/|m4a/|pdf/|jpg/|png/|jpeg/|gif/|md/|zip/|rar/|exe/|tar/|txt/|html/|7z/|arj/|deb/|pkg/|rpm/|tar.gz/|z/|bin/|dmg/|iso/|toast/|vcd/|csv/|dat/|db/|dbf/|log/|mdv/|sav/|sql/|xml/|email/|vcf/|apk/|bat/|bin/|cgi/|jar/|py/|msi/|wsf/|fnt/|fon/|otf/|ttf/|ai/|bmp/|ico/|ps/|psd/|svg/|tif/|tiff/|asp/|aspx/|cer/|cfm/|cgi/|pl/|css/|htm/|html/|js/|jsp/|part/|php/|rss/|xhtml/|key/|odp/|pps/|ppt/|pptx/|pem/|ppk/|java/|sh/|vb/|ods/|xls/|xlsm/|xlsx/|3gp/|flv/|m4v/|mpg/|mpeg/|avi/|doc/|docx/|rtf/|".indexOf(`|${ext}|`) >= 0) {
                    p = p.slice(0, -1);
                }
                if (n === '') {
                    break;
                }
                html += `<a class="dropdown-item"  href="${p}">> ${n}</a>`;
            }
        }
    }

    html += `</div></li><li class="nav-item">
    <a class="nav-link" href="${UI.contact_link}" target="_blank">${UI.nav_link_4}</a>
  </li>${UI.show_logout_button ?'<li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>': ''}`;

    var search_text = model.is_search_page ? (model.q || '') : '';
    var search_bar = `
</ul>
<form class="d-flex" method="get" action="/${cur}:search">
<input class="form-control me-2" name="q" type="search" placeholder="Search" aria-label="Search" value="${search_text}" required>
<button class="btn ${UI.search_button_class}" onclick="if($('#search_bar_form>input').val()) $('#search_bar_form').submit();" type="submit">Search</button>
</form>
</div>
</div>
</nav>
`;

    if (model.root_type < 2) {
        html += search_bar;
    }

    $('#nav').html(html);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function requestListPath(path, params, resultCallback, authErrorCallback) {
    var p = {
        password: params['password'] || null,
        page_token: params['page_token'] || null,
        page_index: params['page_index'] || 0
    };
    $('#update').html(`<div class='alert alert-info' role='alert'> Connecting...</div></div></div>`);
    $.post(path, p, function(data, status) {
        var res = jQuery.parseJSON(gdidecode(read(data)));
        if (res && res.error && res.error.code == '401') {
            if (authErrorCallback) authErrorCallback(path)
        } else if (res && res.data === null) {
            $('#spinner').remove();
            $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data. </div></div></div>`);
            $('#update').remove();
        } else if (res && res.data) {
            if (resultCallback) resultCallback(res, path, p)
            $('#update').remove();
        }
    }).fail(function(response) {
        sleep(2000);
        $('#update').html(`<div class='alert alert-info' role='alert'> Retrying...</div></div></div>`);
        $.post(path, p, function(data, status) {
            var res = jQuery.parseJSON(gdidecode(read(data)));
            if (res && res.error && res.error.code == '401') {
                if (authErrorCallback) authErrorCallback(path)
            } else if (res && res.data === null) {
                $('#spinner').remove();
                $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data. </div></div></div>`);
                $('#update').remove();
            } else if (res && res.data) {
                if (resultCallback) resultCallback(res, path, p)
                $('#update').remove();
            }
        }).fail(function(response) {
            sleep(2000);
            $('#update').html(`<div class='alert alert-info' role='alert'> Retrying...</div></div></div>`);
            $.post(path, p, function(data, status) {
                var res = jQuery.parseJSON(gdidecode(read(data)));
                if (res && res.error && res.error.code == '401') {
                    if (authErrorCallback) authErrorCallback(path)
                } else if (res && res.data === null) {
                    $('#spinner').remove();
                    $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data. </div></div></div>`);
                    $('#update').remove();
                } else if (res && res.data) {
                    if (resultCallback) resultCallback(res, path, p)
                    $('#update').remove();
                }
            }).fail(function(response) {
                $('#update').html(`<div class='alert alert-danger' role='alert'> Unable to get data from the server, Something went wrong.</div></div></div>`);
                $('#list').html(`<div class='alert alert-danger' role='alert'> We were unable to get data from the server.</div></div></div>`);
                $('#spinner').remove();
            });
        });
    });
}

function requestSearch(params, resultCallback) {
    var p = {
        q: params['q'] || null,
        page_token: params['page_token'] || null,
        page_index: params['page_index'] || 0
    };
    $('#update').html(`<div class='alert alert-info' role='alert'> Connecting...</div></div></div>`);
    $.post(`/${window.current_drive_order}:search`, p, function(data, status) {
        var res = jQuery.parseJSON(gdidecode(read(data)));
        if (res && res.data === null) {
            $('#spinner').remove();
            $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data.</div></div></div>`);
            $('#update').remove();
        }
        if (res && res.data) {
            if (resultCallback) resultCallback(res, p)
            $('#update').remove();
        }
    }).fail(function(response) {
        sleep(2000);
        $('#update').html(`<div class='alert alert-info' role='alert'> Retrying...</div></div></div>`);
        $.post(`/${window.current_drive_order}:search`, p, function(data, status) {
            var res = jQuery.parseJSON(gdidecode(read(data)));
            if (res && res.data === null) {
                $('#spinner').remove();
                $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data. </div></div></div>`);
                $('#update').remove();
            }
            if (res && res.data) {
                if (resultCallback) resultCallback(res, p)
                $('#update').remove();
            }
        }).fail(function(response) {
            sleep(2000);
            $('#update').html(`<div class='alert alert-info' role='alert'> Retrying...</div></div></div>`);
            $.post(`/${window.current_drive_order}:search`, p, function(data, status) {
                var res = jQuery.parseJSON(gdidecode(read(data)));
                if (res && res.data === null) {
                    $('#spinner').remove();
                    $('#list').html(`<div class='alert alert-danger' role='alert'> Server didn't sent any data. </div></div></div>`);
                    $('#update').remove();
                }
                if (res && res.data) {
                    if (resultCallback) resultCallback(res, p)
                    $('#update').remove();
                }
            }).fail(function(response) {
                $('#update').html(`<div class='alert alert-danger' role='alert'> Unable to get data from the server, Something went wrong. 3 Failures</div></div></div>`);
                $('#list').html(`<div class='alert alert-danger' role='alert'> We were unable to get data from the server.</div></div></div>`);
                $('#spinner').remove();
            });
        });
    });
}

function list(path) {
    var content = `<div class="container">${UI.fixed_header ?'<br>': ''}
  <div id="update"></div>
    <div id="head_md" style="display:none; padding: 20px 20px;"></div>
    <div class="${UI.path_nav_alert_class} d-flex align-items-center" role="alert" style="margin-bottom: 0; padding-bottom: 0rem;">
  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
    <ol class="breadcrumb" id="folderne"><li class="breadcrumb-item"><a href="/">Home</a></li>`;
    var navfulllink = window.location.pathname;
    var navarray = navfulllink.trim('/').split('/');
    var p = '/';
    if (navarray.length > 1) {
        for (var i in navarray) {
            var an = navarray[i];
            n1 = decodeURIComponent(an);
            n2 = n1.replace(/\?.+/g, "$'")
            if (n2.length > 15) {
                n = n2.slice(0, 5) + '...';
            } else {
                n = n2.slice(0, 15);
            }
            p += an + '/';
            if (n === '') {
                break;
            }
            content += `<li class="breadcrumb-item"><a href="${p}">${n}</a></li>`;
        }
    }
    content += `</ol>
  </nav>
  </div>
    <div id="list" class="list-group text-break">
    </div>
    <div class="${UI.file_count_alert_class} text-center d-none" role="alert" id="count">Total <span class="number text-center"></span> items</div>
    <div id="readme_md" style="display:none; padding: 20px 20px;"></div>
    </div>
    `;
    $('#content').html(content);

    var password = localStorage.getItem('password' + path);
    $('#list').html(`<div class="d-flex justify-content-center"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');

    function successResultCallback(res, path, prevReqParams) {
        $('#list')
            .data('nextPageToken', res['nextPageToken'])
            .data('curPageIndex', res['curPageIndex']);

        $('#spinner').remove();

        if (res['nextPageToken'] === null) {
            $(window).off('scroll');
            window.scroll_status.event_bound = false;
            window.scroll_status.loading_lock = false;
            append_files_to_list(path, res['data']['files']);
        } else {
            append_files_to_list(path, res['data']['files']);
            if (window.scroll_status.event_bound !== true) {
                $(window).on('scroll', function() {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = getDocumentHeight();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
                        if (window.scroll_status.loading_lock === true) {
                            return;
                        }
                        window.scroll_status.loading_lock = true;

                        $(`<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div></div>`)
                            .insertBefore('#readme_md');

                        let $list = $('#list');
                        requestListPath(path, {
                                password: prevReqParams['password'],
                                page_token: $list.data('nextPageToken'),
                                page_index: $list.data('curPageIndex') + 1
                            },
                            successResultCallback,
                            null
                        )
                    }
                });
                window.scroll_status.event_bound = true
            }
        }

        if (window.scroll_status.loading_lock === true) {
            window.scroll_status.loading_lock = false
        }
    }

    requestListPath(path, {
            password: password
        },
        successResultCallback,
        function(path) {
            $('#spinner').remove();
            var pass = prompt("Directory encryption, please enter the password", "");
            localStorage.setItem('password' + path, pass);
            if (pass != null && pass != "") {
                list(path);
            } else {
                history.go(-1);
            }
        });
}

function append_files_to_list(path, files) {
    var $list = $('#list');
    var is_lastpage_loaded = null === $list.data('nextPageToken');
    var is_firstpage = '0' == $list.data('curPageIndex');

    var html = "";
    let targetFiles = [];
    for (var i in files) {
        var item = files[i];
        var ep = item.name + '/';
        var p = path + ep.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
        if (item['size'] == undefined) {
            item['size'] = "";
        }

        item['modifiedTime'] = utc2delhi(item['modifiedTime']);
        item['size'] = formatFileSize(item['size']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            html += `<a href="${p}" style="color: ${UI.folder_text_color};" class="list-group-item list-group-item-action"><svg width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><linearGradient id="WQEfvoQAcpQgQgyjQQ4Hqa" x1="24" x2="24" y1="6.708" y2="14.977" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#eba600"></stop><stop offset="1" stop-color="#c28200"></stop></linearGradient><path fill="url(#WQEfvoQAcpQgQgyjQQ4Hqa)" d="M24.414,10.414l-2.536-2.536C21.316,7.316,20.553,7,19.757,7L5,7C3.895,7,3,7.895,3,9l0,30	c0,1.105,0.895,2,2,2l38,0c1.105,0,2-0.895,2-2V13c0-1.105-0.895-2-2-2l-17.172,0C25.298,11,24.789,10.789,24.414,10.414z"></path><linearGradient id="WQEfvoQAcpQgQgyjQQ4Hqb" x1="24" x2="24" y1="10.854" y2="40.983" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffd869"></stop><stop offset="1" stop-color="#fec52b"></stop></linearGradient><path fill="url(#WQEfvoQAcpQgQgyjQQ4Hqb)" d="M21.586,14.414l3.268-3.268C24.947,11.053,25.074,11,25.207,11H43c1.105,0,2,0.895,2,2v26	c0,1.105-0.895,2-2,2H5c-1.105,0-2-0.895-2-2V15.5C3,15.224,3.224,15,3.5,15h16.672C20.702,15,21.211,14.789,21.586,14.414z"></path></svg> ${item.name} ${UI.display_time ? `<span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span>` : ``}</a>`;
        } else {
            var epn = item.name;
            var p = UI.second_domain_for_dl ? UI.downloaddomain + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F') : window.location.origin + path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
            var pn = path + epn.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
            if (is_lastpage_loaded && item.name == "README.md" && UI.render_readme_md) {
                get_file(p, item, function(data) {
                    markdown("#readme_md", data);
                    $("img").addClass("img-fluid")
                });
            }
            if (item.name == "HEAD.md" && UI.render_head_md) {
                get_file(p, item, function(data) {
                    markdown("#head_md", data);
                    $("img").addClass("img-fluid")
                });
            }
            var ext = p.split('.').pop().toLowerCase();
            pn += "?a=view";
            html += `<div class="list-group-item list-group-item-action">`

            if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
                html += `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g transform="translate(0 -1028.362)"><path d="m 12,1028.3622 c -6.62589,0 -12.00002,5.3741 -12.00002,12 0,6.6259 5.37413,12 12.00002,12 6.62589,0 12.00002,-5.3741 12.00002,-12 0,-6.6259 -5.37413,-12 -12.00002,-12 z" fill="#50b748"/><path d="m 13,1035.162 a 2.5,2.5 0 0 0 -2.5,2.5 2.5,2.5 0 0 0 0.87695,1.9004 l -2.45117,0 A 2,2 0 0 0 9.5,1038.162 a 2,2 0 0 0 -2,-2 2,2 0 0 0 -2,2 2,2 0 0 0 0.64843,1.4707 C 5.77,1039.775 5.5,1040.133 5.5,1040.5624 l 0,4 c 0,0.554 0.44599,1 1,1 l 8,0 c 0.55401,0 1,-0.446 1,-1 l 0,-0.8008 3,1.8008 0,-6 -3,1.8008 0,-0.8008 c 0,-0.5194 -0.39686,-0.9294 -0.90235,-0.9805 a 2.5,2.5 0 0 0 0.90235,-1.9199 2.5,2.5 0 0 0 -2.5,-2.5 z m 0,1 a 1.5,1.5 0 0 1 1.5,1.5 1.5,1.5 0 0 1 -1.5,1.5 1.5,1.5 0 0 1 -1.5,-1.5 1.5,1.5 0 0 1 1.5,-1.5 z m -5.5,1 a 1,1 0 0 1 1,1 1,1 0 0 1 -1,1 1,1 0 0 1 -1,-1 1,1 0 0 1 1,-1 z m 2,6.4004 1,0 0,1 -1,0 0,-1 z m 2,0 1,0 0,1 -1,0 0,-1 z m 2,0 1,0 0,1 -1,0 0,-1 z" fill="#fff"/></g></svg>`
            } else if ("|html|php|css|go|java|js|json|txt|sh|".indexOf(`|${ext}|`) >= 0) {
                html += `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#F47920" d="M21 5l-5-5H5a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5z"/></svg>`
            } else if ("|zip|".indexOf(`|${ext}|`) >= 0) {
                html += `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="#4bbfeb" d="M4 4h24v24H4z"/></svg>`
            } else if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
                html += `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#2D98D4" d="M22 21H2c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h20c1.103 0 2 .897 2 2v14c0 1.103-.897 2-2 2z"/></svg>`
            } else if ("|m4a|mp3|flac|wav|ogg|".indexOf(`|${ext}|`) >= 0) {
                html += `<svg width="1.5em" height="1.5em" viewBox="0 0 512 512"><circle fill="#FFD400" cx="256" cy="256" r="256"/></svg>`
            } else {
                html += `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="#4989b8" d="M4 2v29h23V8L21 2H4z"/></svg>`
            }

            html += ` <a class="list-group-item-action" style="text-decoration: none; color: ${UI.css_a_tag_color};" href="${pn}">${item.name}</a>${UI.display_download ? `<a href="${p}"><svg class="float-end" width="25px" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path></svg></a>` : ``}${UI.display_size ? `<span class="badge bg-primary float-end"> ` + item['size'] + ` </span>` : ``}${UI.display_time ? ` <span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span>` : ``}</div>`;
        }
    }

    $list.html(($list.data('curPageIndex') == '0' ? '' : $list.html()) + html);
    if (is_lastpage_loaded) {
        $('#count').removeClass('d-none').find('.number').text($list.find('a.list-group-item-action').length);
    }
}

function render_search_result_list() {
    var content = `
  <div class="container"><br>
  <div id="update"></div>
  <div class="card">
  <div class="${UI.path_nav_alert_class} d-flex align-items-center" role="alert" style="margin-bottom: 0;">Search Results</div>
  <div id="list" class="list-group text-break">
  </div>
  </div>
  <div class="${UI.file_count_alert_class} text-center d-none" role="alert" id="count">Total <span class="number text-center"></span> items</div>
  <div id="readme_md" style="display:none; padding: 20px 20px;"></div>
  </div>
  `;
    $('#content').html(content);

    $('#list').html(`<div class="d-flex justify-content-center"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');

    function searchSuccessCallback(res, prevReqParams) {
        $('#list')
            .data('nextPageToken', res['nextPageToken'])
            .data('curPageIndex', res['curPageIndex']);

        $('#spinner').remove();

        if (res['nextPageToken'] === null) {
            $(window).off('scroll');
            window.scroll_status.event_bound = false;
            window.scroll_status.loading_lock = false;
            append_search_result_to_list(res['data']['files']);
        } else {
            append_search_result_to_list(res['data']['files']);
            if (window.scroll_status.event_bound !== true) {
                $(window).on('scroll', function() {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = getDocumentHeight();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight > scrollHeight - (Os.isMobile ? 130 : 80)) {
                        if (window.scroll_status.loading_lock === true) {
                            return;
                        }
                        window.scroll_status.loading_lock = true;

                        $(`<div id="spinner" class="d-flex justify-content-center"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div></div>`)
                            .insertBefore('#readme_md');

                        let $list = $('#list');
                        requestSearch({
                                q: window.MODEL.q,
                                page_token: $list.data('nextPageToken'),
                                page_index: $list.data('curPageIndex') + 1
                            },
                            searchSuccessCallback
                        )
                    }
                });
                window.scroll_status.event_bound = true
            }
        }

        if (window.scroll_status.loading_lock === true) {
            window.scroll_status.loading_lock = false
        }
    }

    requestSearch({
        q: window.MODEL.q
    }, searchSuccessCallback);
}

function append_search_result_to_list(files) {
    var cur = window.current_drive_order || 0;
    var $list = $('#list');
    var is_lastpage_loaded = null === $list.data('nextPageToken');

    var html = "";

    for (var i in files) {
        var item = files[i];
        if (item['size'] == undefined) {
            item['size'] = "";
        }

        item['modifiedTime'] = utc2delhi(item['modifiedTime']);
        item['size'] = formatFileSize(item['size']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            html += `<a style="color: ${UI.folder_text_color};" ${UI.search_all_drives ? `href="https://drive.google.com/drive/folders/` + item['id'] + `" target="_blank"` : `onclick="onSearchResultItemClick(this)" data-bs-toggle="modal" data-bs-target="#SearchModel" id="` + item['id'] + `"`} class="list-group-item list-group-item-action"><svg width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#ffd869" d="M21.586 14.414l3.268-3.268C24.947 11.053 25.074 11 25.207 11H43c1.105 0 2 .895 2 2v26c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V15.5C3 15.224 3.224 15 3.5 15h16.672c1.53 0 2.039-.211 2.414-.586z"/></svg> ${item.name} ${UI.display_time ? `<span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span>` : ``}</a>`;
        } else {
            var pn = '/' + cur + ':/' + item.name + '?a=view';
            html += `<a style="color: ${UI.css_a_tag_color};" ${UI.search_all_drives ? `href="https://drive.google.com/file/d/` + item['id'] + `/view" target="_blank"` : `onclick="onSearchResultItemClick(this)" data-bs-toggle="modal" data-bs-target="#SearchModel" id="` + item['id'] + `"`} gd-type="${item.mimeType}" class="list-group-item list-group-item-action">`;
            html += ` ${item.name}<span class="badge float-end csize"> ${UI.display_size ? `<span class="badge bg-primary float-end"> ` + item['size'] + ` </span>` : ``}${UI.display_time ? ` <span class="badge bg-info float-end"> ` + item['modifiedTime'] + ` </span>` : ``}</a>`;
        }
    }

    $list.html(($list.data('curPageIndex') == '0' ? '' : $list.html()) + html);
    if (is_lastpage_loaded) {
        $('#count').removeClass('d-none').find('.number').text($list.find('a.list-group-item').length);
    }
}

function onSearchResultItemClick(a_ele) {
    var cur = window.current_drive_order;
    $('#SearchModelLabel').html(`Loading...`);
    $('#modal-body-space').html(`<div class="d-flex justify-content-center"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div>`);

    $.post(`/${cur}:id2path`, {
        id: a_ele.id
    }, function(data) {
        if (data) {
            var href = `/${cur}:${data}${data.endsWith('/') ? '' : '?a=view'}`;
            var ehrefurl = href.replace(new RegExp('#', 'g'), '%23').replace(new RegExp('\\?', 'g'), '%3F');
            $('#SearchModelLabel').html(`Result`);
            $('#modal-body-space').html(`<a class="btn btn-info" href="${ehrefurl}">Open</a> <a class="btn btn-secondary" href="${ehrefurl}" target="_blank">Open in New Tab</a>`);
            return;
        }
        $('#SearchModelLabel').html(`Failed`);
        $('#modal-body-space').html(`System Failed to Fetch the File/Folder Link, Please close and try again.`);
    })
}

function get_file(path, file, callback) {
    var key = "file_path_" + path + file['modifiedTime'];
    var data = localStorage.getItem(key);
    if (data != undefined) {
        return callback(data);
    } else {
        $.get(path, function(d) {
            localStorage.setItem(key, d);
            callback(d);
        });
    }
}

function file(path) {
    var name = path.split('/').pop();
    var ext = name.split('.').pop().toLowerCase().replace(`?a=view`, "").toLowerCase();
    $('#content').html(`<div class="d-flex justify-content-center" style="height: 150px"><div class="spinner-border ${UI.loading_spinner_class} m-5" role="status" id="spinner"><span class="sr-only"></span></div></div>`);
    if ("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0) {
        return file_code(path);
    }
    if ("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
        return file_video(path);
    }
    if ("|mp3|flac|wav|ogg|m4a|aac|".indexOf(`|${ext}|`) >= 0) {
        return file_audio(path);
    }
    if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
        return file_image(path);
    }
    if ('pdf' === ext) {
        return file_pdf(path);
    } else {
        return file_others(path);
    }
}

function file_others(path) {
    var name = path.split('/').pop();
    var decodename = unescape(name);
    var url = UI.second_domain_for_dl ? UI.downloaddomain + path : window.location.origin + path;
    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var content = `
<div class="container"><br>
<div class="card text-center">
<div class="card-body text-center">
  <div class="${UI.file_view_alert_class}" id="file_details" role="alert">${obj.name}<br>${size}</div>
</div>
<div class="card-body">
<div class="input-group mb-4">
  <div class="input-group-prepend">
    <span class="input-group-text">Full URL</span>
  </div>
  <input type="text" class="form-control" id="dlurl" value="${url}">
</div>
  <div class="card-text text-center">
  ${UI.display_drive_link ? '<a type="button" class="btn btn-info" href="https://drive.google.com/file/d/'+ obj.id +'/view" target="_blank">GD Link</a>': ''}
  <div class="btn-group text-center">
      <a href="${url}" type="button" class="btn btn-primary">Download</a>
  </div>
  <button onclick="copyFunction()" class="btn btn-success">Copy</button>
  </div>
  <br></div></div></div>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });
}

function file_code(path) {
    var name = path.split('/').pop();
    var url = UI.second_domain_for_dl ? UI.downloaddomain + path : window.location.origin + path;
    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var content = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism-twilight.css">
<div class="container"><br>
<div class="card text-center">
<div class="card-body text-center">
  <div class="${UI.file_view_alert_class}" id="file_details" role="alert">${obj.name}<br>${size}</div>
  <pre class="line-numbers language-markup" style="white-space: pre-wrap;" tabindex="0"><code id="editor"></code></pre>
</div>
<div class="card-body">
<div class="input-group mb-4">
  <div class="input-group-prepend"><span class="input-group-text">Full URL</span></div>
  <input type="text" class="form-control" id="dlurl" value="${url}">
</div>
<div class="card-text text-center">
  <a href="${url}" type="button" class="btn btn-primary">Download</a>
  <button onclick="copyFunction()" class="btn btn-success">Copy</button>
</div><br></div>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.js"></script>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });

    $.get(path, function(data) {
        $('#editor').html($('<div/><div/><div/>').text(data).html());
    });
}

// VIDSTACK IMPLEMENTATION FOR VIDEO
function file_video(path) {
    var name = path.split('/').pop();
    var decodename = unescape(name);
    var url = UI.second_domain_for_dl ? UI.videodomain + path : window.location.origin + path;
    var urlvlc = url.replace(new RegExp('\\[', 'g'), '%5B').replace(new RegExp('\\]', 'g'), '%5D').replace(new RegExp('\\!', 'g'), '%25');
    var url_without_https = url.replace(/^(https?:|)\/\//, '');
    var url_base64 = btoa(url);

    // Build base URL without extension to reliably create absolute URLs for all subtitles
    var urlBase = url.substring(0, url.lastIndexOf('.'));

    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var poster = obj.thumbnailLink != null ? obj.thumbnailLink.slice(0, -5) : UI.poster;

            var content = `
  <div class="container text-center"><br>
  <div class="card text-center">
  <div class="text-center">
  <div class="${UI.file_view_alert_class}" id="file_details" role="alert">${obj.name}<br>${size}</div>

  <media-player title="${decodename}" src="${url}" poster="${poster}" crossOrigin="anonymous" playsinline style="width: 100%; aspect-ratio: 16/9;">
    <media-provider></media-provider>
    
    <!-- Absolute Subtitle URLs (Crucial for Chromecast & WebVTT) -->
    <track src="${urlBase}.en.vtt" kind="subtitles" label="English" srclang="en" default />
    <track src="${urlBase}.vtt" kind="subtitles" label="Default" srclang="en" />
    <track src="${urlBase}.hi.vtt" kind="subtitles" label="Hindi" srclang="hi" />
    <track src="${urlBase}.ru.vtt" kind="subtitles" label="Russian" srclang="ru" />
    <track src="${urlBase}.ml.vtt" kind="subtitles" label="Malayalam" srclang="ml" />
    <track src="${urlBase}.ko.vtt" kind="subtitles" label="Korean" srclang="ko" />
    <track src="${urlBase}.ja.vtt" kind="subtitles" label="Japanese" srclang="ja" />
    <track src="${urlBase}.id.vtt" kind="subtitles" label="Indonesian" srclang="id" />
    <track src="${urlBase}.de.vtt" kind="subtitles" label="German" srclang="de" />
    <track src="${urlBase}.fr.vtt" kind="subtitles" label="French" srclang="fr" />
    <track src="${urlBase}.zh.vtt" kind="subtitles" label="Chinese" srclang="zh" />
    <track src="${urlBase}.ar.vtt" kind="subtitles" label="Arabic" srclang="ar" />
    <track src="${urlBase}.${UI.custom_srt_lang}.vtt" kind="subtitles" label="${UI.custom_srt_lang}" srclang="${UI.custom_srt_lang}" />

    <!-- Vidstack Default UI Video Layout with Cast and AirPlay -->
    <media-video-layout></media-video-layout>
  </media-player>

  </div>
  ${UI.disable_player ? '<style>media-player{display:none;}</style>' : ''}
  </br>
${UI.disable_video_download ? `` : `
<div class="card-body">
<div class="input-group mb-4">
  <div class="input-group-prepend"><span class="input-group-text">Full URL</span></div>
  <input type="text" class="form-control" id="dlurl" value="${url}">
</div>
${UI.display_drive_link ? '<a type="button" class="btn btn-info" href="https://drive.google.com/file/d/'+ obj.id +'/view" id="file_drive_link" target="_blank">GD Link</a>': ''}
<div class="btn-group text-center">
    <a href="${url}" type="button" class="btn btn-primary">Download</a>
    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="sr-only"></span>
    </button>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="iina://weblink?url=${url}">IINA</a>
      <a class="dropdown-item" href="potplayer://${url}">PotPlayer</a>
      <a class="dropdown-item" href="vlc://${urlvlc}">VLC Mobile</a>
      <a class="dropdown-item" href="${urlvlc}">VLC Desktop</a>
      <a class="dropdown-item" href="nplayer-${url}">nPlayer</a>
      <a class="dropdown-item" href="intent://${url_without_https}#Intent;type=video/any;package=is.xyz.mpv;scheme=https;end;">mpv-android</a>
      <a class="dropdown-item" href="mpv://${url_base64}">mpv x64</a>
      <a class="dropdown-item" href="intent:${url}#Intent;package=com.mxtech.videoplayer.ad;S.title=${decodename};end">MX Player (Free)</a>
      <a class="dropdown-item" href="intent:${url}#Intent;package=com.mxtech.videoplayer.pro;S.title=${decodename};end">MX Player (Pro)</a>
      <a class="dropdown-item" href="intent:${url}#Intent;component=idm.internet.download.manager/idm.internet.download.manager.Downloader;S.title=${decodename};end">1DM (Free)</a>
    </div>
</div>
<button onclick="copyFunction()" onmouseout="outFunc()" class="btn btn-success"><span class="tooltiptext" id="myTooltip">Copy</span></button>
<br>
  </div>
  `}
  </div></div>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });
}

// VIDSTACK IMPLEMENTATION FOR AUDIO
function file_audio(path) {
    var name = path.split('/').pop();
    var decodename = unescape(name);
    var url = UI.second_domain_for_dl ? UI.downloaddomain + path : window.location.origin + path;
    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var content = `
  <div class="container"><br>
  <div class="card" style="background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);">
  <div class="card-body text-center">
  <div class="${UI.file_view_alert_class}" id="file_details" role="alert">${obj.name}<br>${size}</div>
  <br><img draggable="false" src="${UI.audioposter}" width="100%" /><br>

  <media-player title="${decodename}" src="${url}" style="width: 100%;">
    <media-provider></media-provider>
    <media-audio-layout></media-audio-layout>
  </media-player>

  </div>
  ${UI.disable_player ? '<style>media-player{display:none;}</style>' : ''}
  </br>
  <div class="card-body">
<div class="input-group mb-4">
  <div class="input-group-prepend"><span class="input-group-text">Full URL</span></div>
  <input type="text" class="form-control" id="dlurl" value="${url}">
</div>
  <div class="card-text text-center">
  <div class="btn-group text-center">
      <a href="${url}" type="button" class="btn btn-primary">Download</a>
  </div>
  <button onclick="copyFunction()" class="btn btn-success">Copy</button>
  </div><br>
  </div></div></div>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });
}

function file_pdf(path) {
    var name = path.split('/').pop();
    var url = UI.second_domain_for_dl ? UI.downloaddomain + path : window.location.origin + path;
    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var content = `
  <div class="container"><br>
  <div class="card">
  <div class="card-body text-center">
  <div class="${UI.file_view_alert_class}" id="file_details" role="alert">${obj.name}<br>${size}</div>
  <iframe src="${url}" width="100%" height="600px"></iframe>
  </div>
  <div class="card-body text-center">
    <a href="${url}" class="btn btn-primary">Download</a>
  </div></div></div>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });
}

function file_image(path) {
    var name = path.split('/').pop();
    var url = UI.second_domain_for_dl ? UI.downloaddomain + path : window.location.origin + path;
    $.post("", function(data) {
        try {
            var obj = jQuery.parseJSON(gdidecode(read(data)));
            var size = formatFileSize(obj.size);
            var content = `
  <div class="container"><br>
  <div class="card text-center">
  <div class="card-body">
  <div class="${UI.file_view_alert_class}">${obj.name}<br>${size}</div>
  <img src="${url}" style="max-width: 100%; height: auto;">
  </div>
  <div class="card-body">
    <a href="${url}" class="btn btn-primary">Download</a>
  </div></div></div>`;
        } catch (err) {
            var content = `<div class="container"><br><div class="card text-center"><div class="card-body">404 Not Found</div></div></div>`;
        }
        $('#content').html(content);
    });
}

function utc2delhi(utc_datetime) {
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second;

    var timestamp = new Date(Date.parse(new_datetime)).getTime() / 1000;
    var unixtimestamp = new Date((timestamp + 5.5 * 60 * 60) * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2) + "-" + date.substring(date.length - 2) + " " + hour.substring(hour.length - 2) + ":" + minute.substring(minute.length - 2) + ":" + second.substring(second.length - 2);
}

function formatFileSize(bytes) {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes > 1) return bytes + ' bytes';
    if (bytes == 1) return bytes + ' byte';
    return '';
}

String.prototype.trim = function(char) {
    if (char) return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    return this.replace(/^\s+|\s+$/g, '');
};

function markdown(el, data) {
    var html = marked.parse(data);
    $(el).show().html(html);
}

window.onpopstate = function() {
    var path = window.location.pathname;
    render(path);
};

function read(str) {
    var gdijsorg_0x1207 = ['join', '645298GrGsiK', '8269zzjDhb', '28wpErfD', '11eoSBcm', '3578714TboDnQ', 'slice', '52214BJnTpj', '14039GFHzjM', '187451gnBzKk', 'substr', 'reverse', '1262156NwMIzh', '2nDedhJ', 'split'];
    var gdijsorg_0x570bf1 = gdijsorg_0x158f;

    function gdijsorg_0x158f(_0x32bcea, _0x29ebfd) {
        _0x32bcea = _0x32bcea - 0x150;
        var _0x1207c1 = gdijsorg_0x1207[_0x32bcea];
        return _0x1207c1;
    }
    (function(_0xbbe83c, _0xbbffd8) {
        var _0x2feec5 = gdijsorg_0x158f;
        while (!![]) {
            try {
                var _0x5d3639 = parseInt(_0x2feec5(0x15c)) * -parseInt(_0x2feec5(0x150)) + -parseInt(_0x2feec5(0x15b)) + -parseInt(_0x2feec5(0x157)) + parseInt(_0x2feec5(0x151)) * parseInt(_0x2feec5(0x152)) + parseInt(_0x2feec5(0x153)) * -parseInt(_0x2feec5(0x156)) + parseInt(_0x2feec5(0x158)) + parseInt(_0x2feec5(0x154));
                if (_0x5d3639 === _0xbbffd8) break;
                else _0xbbe83c['push'](_0xbbe83c['shift']());
            } catch (_0x2894d2) {
                _0xbbe83c['push'](_0xbbe83c['shift']());
            }
        }
    }(gdijsorg_0x1207, 0xd11e8));
    var sa = str[gdijsorg_0x570bf1(0x15d)](''),
        ra = sa[gdijsorg_0x570bf1(0x15a)](),
        ja = ra[gdijsorg_0x570bf1(0x15e)](''),
        aj = ja[gdijsorg_0x570bf1(0x159)](0x18)[gdijsorg_0x570bf1(0x155)](0x0, -0x14);
    return aj;
}

$(function() {
    init();
    render(window.location.pathname);
});

function copyFunction() {
    var copyText = document.getElementById("dlurl");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    var tooltip = document.getElementById("myTooltip");
    if (tooltip) tooltip.innerHTML = "Copied";
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    if (tooltip) tooltip.innerHTML = "Copy";
}