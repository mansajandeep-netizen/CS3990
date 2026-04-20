
let hannaShop = [
    {
        group: "Coffee beans",
        name: "Colombian Supremo Coffee",
        price: 21.89,
        image: "https://assets.shop.loblaws.ca/products/21380579/b1/en/front/21380579_front_a01_@2.png",
        descr: "The Colombian Supremo Coffee Beans offer a mellow cup with complex aromas and rich flavours."
    },
    {
        group: "Coffee beans",
        name: "Ethiopian Sidamo Coffee",
        price: 23.49,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRxykmHE9QrbwlyMvRRhEk6ukSz-_LZS5YHHERpGTscDxU5-1bSY7_t6QUX-6_pepNUDelo2ppAK0seXLDpHylYbQ7xYwRH58CJQFQczfCFWC5tsQNfLeRU6dU",
        descr: "Ethiopian Sidamo is consistently rated one of the best coffees in the world. It begins with fruity notes and ends with a rich, full-bodied finish."
    },
    {
        group: "Coffee and Tea Accessories",
        name: "Milk Frother",
        price: 13.97,
        image: "https://m.media-amazon.com/images/I/41woZkL5CKL._AC_US100_.jpg",
        descr: "Make Creamy Froth Quickly: If you love your morning coffee filled with froth and foam, the portable electric milk frother is perfect for you."
    },
    {
        group: "Coffee makers",
        name: "Braun Drip Coffee Maker",
        price: 139,
        image: "https://m.media-amazon.com/images/I/41N4HzzYZfL._AC_US100_.jpg",
        descr: "Braun's PureFlavor technology ensures your coffee is made at the right temperature and brewing time to unlock the full flavor of your grounds."
    }
];



class groupElem {
    constructor(groupName) {
        this.groupName = groupName;
    }

    // Render and append a <li> into the #groups <ul>
    render() {
        const $li = $("<li></li>")
            .text(this.groupName)
            .attr("data-group", this.groupName);

        $("#groups").append($li);
    }
}



function generateGroups() {
    const seen = [];

    hannaShop.forEach(function (product) {
        if (!seen.includes(product.group)) {
            seen.push(product.group);
            const elem = new groupElem(product.group);
            elem.render();
        }
    });
}



class Item {
    constructor(name, image, price, group, descr) {
        this.name  = name;
        this.image = image;
        this.price = price;
        this.group = group;
        this.descr = descr;
    }

    // Build and return the card element (does NOT append itself)
    render() {
        const $card = $("<div></div>")
            .addClass("item-card")
            .attr("data-group", this.group)
            .attr("data-descr", this.descr);

        const $name = $("<div></div>")
            .addClass("item-name")
            .text(this.name);

        const $img = $("<img>")
            .attr("src", this.image)
            .attr("alt", this.name);

        const $price = $("<div></div>")
            .addClass("item-price")
            .text(this.price);

        $card.append($name, $img, $price);
        return $card;
    }
}



function generateItems() {
    hannaShop.forEach(function (product) {
        const item = new Item(
            product.name,
            product.image,
            product.price,
            product.group,
            product.descr
        );
        $("#itemsGallery").append(item.render());
    });
}


$("#groups").on("mouseover", "li", function () {
    const hoveredGroup = $(this).attr("data-group");

    // Mark active category
    $("#groups li").removeClass("active");
    $(this).addClass("active");

    // Remove previous highlights then add to matching cards
    $(".item-card").removeClass("highlighted");
    $(".item-card[data-group='" + hoveredGroup + "']").addClass("highlighted");
});

// Remove highlights when mouse leaves the list entirely
$("#groups").on("mouseleave", function () {
    $("#groups li").removeClass("active");
    $(".item-card").removeClass("highlighted");
});


$("#itemsGallery").on("click", ".item-card", function () {
    const descr = $(this).attr("data-descr");
    $("#itemDescr").text(descr);
});



generateGroups();
generateItems();