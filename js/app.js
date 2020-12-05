'use strict';
// create gallary 

var optionList = [];

$.ajax('data/page-1.json')
    .then(data => {

        data.forEach((element) => {
            let newGallary = new Gallary(element);
            newGallary.page2Render();;
        })
        $('#photo-template').first().remove();
        $('#option').first().remove();
        renderOption();
    }) 

let gallaries = [];

function Gallary(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    gallaries.push(this);

}
$('button').on('click', function () {

    if (this.id === 'page2') {

        optionList = [];
        gallaries = [];
        $("main").empty();
        $('#keywordList').empty();
        $.ajax('data/page-2.json')
            .then(data2 => {
                data2.forEach((element2) => {
                    let page2Gallary = new Gallary(element2);
                    page2Gallary.page2Render();

                })
                $('#option').first().remove();
                renderOption();
                console.log(optionList);


            })
    } else if (this.id === 'page1') {
        gallaries = [];
        optionList = [];
        $('#photo-template').hide();
        $('#keywordList').empty();
        $.ajax('data/page-1.json')
            .then(data3 => {

                data3.forEach((element3) => {
                    let newGallary3 = new Gallary(element3);


                    newGallary3.render();


                })

                renderOption();

                console.log(gallaries);

            })
    }
});


Gallary.prototype.render = function () {


    let photoCard = $('#photo-template').first().clone();
    photoCard.attr('class', this.keyword);

    photoCard.find('#imgTitle').text(this.title);
    photoCard.find('#imgUrl').attr('src', this.image_url);
    photoCard.find('#imgDesc').text(this.description);
    $("main").append(photoCard);
    photoCard.remove('photo-template');
    $('#photo-template').first().remove();


}

function renderOption() {

    for (let i = 0; i < gallaries.length; i++) {
        if (optionList.includes(gallaries[i].keyword) === false) {
            optionList.push(gallaries[i].keyword);
        }

    }
    optionList.forEach(item => {

        let optionTag = ` <option value="${item}" id="option">${item}</option>`;
        $('#keywordList').append(optionTag);

        console.log(optionTag);

    })

}

console.log(optionList);




$('#keywordList').on('change', function () {
    console.log(this.value);
    for (let j = 0; j < gallaries.length; j++) {

        let clickRender = $(`.${gallaries[j].keyword}`)
        if (this.value !== gallaries[j].keyword) {
            clickRender.hide();

        } else {
            clickRender.show();
        }
    }
});




Gallary.prototype.page2Render = function () {


    let page2 = $('#page2-template').html();

    let pageHtml = Mustache.render(page2, this);
    $('main').append(pageHtml)
    console.log(pageHtml);

    return pageHtml;
}

$('#sortHorn').click(function () {

    sortByHorns();
    gallaries.forEach(element => {
        element.render();
    });
});

$('#sortTitle').click(function () {
    sortByTitle();

    gallaries.forEach(element => {
        element.render();
    });
});

function sortByTitle() {
    gallaries.sort((a, b) => {
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });

}

function sortByHorns() {
    gallaries.sort((a, b) => {
        if (a.horns > b.horns) {
            return 1;
        } else if (a.horns < b.horns) {
            return -1;
        } else {
            return 0;
        }
    });

} 
