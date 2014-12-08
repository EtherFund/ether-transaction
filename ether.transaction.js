/*
- ether.transaction.js v0.1
- Explore transactions on the Ethereum network discovered by Etherface.
- http://ether.fund/tool/transactions
- (c) 2014 J.R. Bédard (jrbedard.com)
*/


// Init
$(function() {

	// transaction loading spinner...
	$("#transactionTable tbody").append("<tr><td id='loadingTransactions' style='text-align:center;' colspan=6><i class='fa fa-cog fa-spin fa-2x'></i> Loading...</td></tr>");
	
});



// list transactions
function getTransactions() {
	var args = {};
	args.filter = $("#filterTransactions .btn").data('val');
	args.sort = $("#sortTransactions .btn").data('val');
	args.start = 0;
	args.range = 10;
	
	// todo: greyingout + loading animation;
	
	// get transactions
	etherface.transaction('list', args, function(transactions) {
		//console.log(transactions);
		updateTransTable(transactions);
		
		$(".timeago").timeago();
		$(".tooltip").tooltip({});
	});
	
	
	// get analytics
	etherface.analytics('transactions', {}, function(data) {
		/*
		$("#lastCrawl").text(data.lastCrawl);
		$("#lastCrawl").attr('title',data.lastCrawl);
		$("#lastCrawl").addClass('timeago');
		$(".timeago").timeago();
		
		//console.log(data);
		
		// Analytics
		updateCharts(data);
		*/
	});	
}


// table in /transactions
function updateTransTable(transactions) {
	//console.log(transactions);
	var table = $("#transactionTable tbody");
	table.html("");
	
	$.each(transactions, function(p) {
		var trans = transactions[p];
		//console.log(trans);
		
		var line = "<tr><td>";
		
		line += "<a href='/tx/"+trans.id+"'>"+trans.id+'</a></td>';

		line += "<td>"+trans.value+'</td>';
		
		line += "<td>"+trans.gasPrice+' szabo</td>';
		
		line += "<td>"+trans.gasLimit+' szabo</td>';
		
		line += "<td>"+trans.nonce+'</td>';
		
		line += "<td>"+trans.init+'</td>';
		
		line += "<td>"+trans.to+'</td>';
		
		line += "<td>"+trans.to+'</td>';
		
		line += "<td><abbr class='timeago' title='"+trans.time+"'>"+trans.time+'</abbr></td>';
		
		line += '</tr>';
		table.append(line);
	});
}


// view
function getTransaction(id) {
	
	var args = {};
	args.filter = $("#filterTransactions .btn").data('val');
	args.sort = $("#sortTransactions .btn").data('val');
	args.start = 0;
	args.range = 10;
	
	// todo: greyingout + loading animation;
	
	// get transactions
	etherface.transaction('list', args, function(transactions) {
		
		var trans = transactions[0];
		
		updateTransPage(trans);
		
		$(".timeago").timeago();
		$(".tooltip").tooltip({});
	});
	
}


// update Transaction page
function updateTransPage(trans) {
	
	$("#transTitle").text(trans.id);
	
	
	// TABLE
	var table = $("#transTable");
	
	table.find("#transId").html(trans.id);
	
	table.find("#transValue").html(trans.value);
	
	table.find("#transGasPrice").html(trans.gasPrice+' szabo');
	
	table.find("#transGasLimit").html(trans.gasLimit+' szabo');
	
	table.find("#transNonce").html(trans.nonce);
	
	table.find("#transInit").html(trans.init);
	
	table.find("#transFrom").html(trans.from);
	
	table.find("#transTo").html(trans.to);
	
	table.find("#transTime").html("<abbr class='timeago' title='"+trans.time+"'>"+trans.time+"</abbr>");	
}






