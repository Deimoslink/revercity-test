data = [
  {
    type: "folder",
    name: "animals",
    children: [

		{
            type: "file",
            name: "cat003.jpg",
            content: "/animals/cat/images/cat002.jpg"
        },


      {
        type: "folder",
        name: "cat",
        children: [
          {
            type: "folder",
            name: "images",
            children: [
              {
                type: "file",
                name: "cat001.jpg",
                content: "/animals/cat/images/cat001.jpg"
              }, {
                type: "file",
                name: "cat002.jpg",
                content: "/animals/cat/images/cat002.jpg"
              }
            ]
          }
        ]
      }
    ]
  }
];

var result = "";

function RenderDOM (object) {
	for (item in object) {
		if (object[item].type === 'folder') {
			result += '<li class="folder"><span>'+object[item].name+'</span><ul>';
			if (object[item].children) {
				RenderDOM(object[item].children);
			}
		result += '</ul></li>';
		} else {
			result += '<li class="file"><span>'+object[item].name+'</span></li>';
		}
	}
	return result;
};





$(document).ready(function () {


var test = RenderDOM(data);

console.log(test);

	function renderPage() {
		var name = $('.selected').children('span').html();
		$('#name').val(name);
	}

	$('#name').on('change', function(){
		var name = $('#name').val();
		(name.length) ? name : name = "Unnamed";
		$('.selected').children('span').html(name);
	});

	function renderButtons() {
		$('.del').show();
		if ($('.selected').hasClass('file')) 
		{
			$('.sav').show(); 
			$('.create-folder').hide();
			$('.create-file').hide();
		} else {
			$('.sav').hide();
			$('.create-folder').show();
			$('.create-file').show();
		};
	}

	function countContent() {
		var folders = $('.selected ul > .folder').length + $('.selected ul > .folder-open').length;
		var files = $('.selected > ul li').length - folders;
		$('#info').html("папок: "+folders+", файлов: "+files);
	}

	function getVolume() {
		var volume = $('#file-content').text().length;
		$('#info').html("вес файла: "+volume+"КБ");
	}


	

$('.del').on('click', function() {
	$('.selected').remove();
		renderPage();
		$('.sav').hide(); 
		$('.create-folder').hide();
		$('.create-file').hide();
		$('#info').empty();
});

	$("#root").on('click', $('#root li'), function(event){
		if(!$(event.target).is('#root')) {
			$('#root li').removeClass('selected');
			var ul = undefined;
			if (!$(event.target).is('li')) {
				$(event.target.parentNode).addClass('selected');
				ul=$('ul:first',event.target.parentNode);

			} else {
				$(event.target).addClass('selected');
				ul=$('ul:first',event.target);
			}
				if (ul.length) {
					ul.slideToggle(300);
				}
			}
			renderButtons();
			renderPage();
			countContent();
	});

	$('#root').on('click', function (event) {
		var type = undefined;
		if ($(event.target).is('li')) {
			type = $(event.target);
		} else {
			type = $(event.target).closest('li');
		}
		if (!type.hasClass('file')) {
			type.hasClass('folder') ? type.removeClass('folder').addClass('folder-open') : type.removeClass('folder-open').addClass('folder');
		} else {
			getVolume();
		}

	});

	$('.button-group').on('click', function (event) {
		var promptAsk = prompt('Введите название');
		(promptAsk.length) ? promptAsk : promptAsk = "Unnamed";
		var folder = '<li class="folder"><span>'+promptAsk+'</span><ul></ul></li>';
		var file = '<li class="file"><span>'+promptAsk+'</span></li>';
		if ($('.selected li').length) {
			$(event.target).hasClass('create-file') ? $('.selected > ul').append(file) : $('.selected > ul').append(folder);
			$('.selected > ul').slideDown(300);
			$('.selected').removeClass('folder').addClass('folder-open');
		} else {
			$(event.target).hasClass('create-file') ? $('.selected ul').append(file) : $('.selected ul').append(folder);
			$('.selected ul').slideDown(300);
			$('.selected').removeClass('folder').addClass('folder-open');
		}
		countContent();
	});


$('#root').html(test);

$('#root ul').hide();
});