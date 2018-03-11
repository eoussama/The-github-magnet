$(document).ready(function() {
	var
		$textBox = $('#textBox'),
		$resultsPanel = $('#resultsPanel'),
		$errorPanel = $('#errorPanel'),
		$errorText = $('#errorText'),
		$profilePanel = $('#profilePanel');
	
	$textBox.on('input', function() {
		let $input = $(this).val().trim();

		if($input.length > 0)
		{
			let user = null;
			
			$.ajax({
				url: 'https://api.github.com/users/' + $input,
				data: {
					client_id: 'ad6b78c61d1707f68319',
					client_secret: '23b42ef8f03b8b78288ae50dc70910ecde3b7b73'
				},
				error: function() {
					$resultsPanel.hide();
					$errorPanel.show();

					$errorText.html(`<i class="fas fa-exclamation-triangle"></i> The user <span>${$input}</span> does not exist!`);
				}
			}).done(function(user) {
				$errorPanel.hide();
				$resultsPanel.show();
				
				$profilePanel.html(`
					<div id="profileLeft">
						<img src="${user.avatar_url}" alt="${user.login}'s avatar"><br>
						<a href="${user.html_url}" target="_blank"><button>Profile</button></a>
					</div>
					<div id="profileRight">
						<h2>${user.login}</h2>
						<div id="profileStats">
							<a href="https://github.com/${user.login}?tab=repositories" target="_blank"><span class="badge">Repos ${user.public_repos}</span></a>
							<a href="https://gist.github.com/${user.login}" target="_blank"><span class="badge">Gists ${user.public_gists}</span></a>
							<a href="https://github.com/${user.login}?tab=followers" target="_blank"><span class="badge">Followers ${user.followers}</span></a>
							<a href="https://github.com/${user.login}?tab=following" target="_blank"><span class="badge">Following ${user.following}</span></a>
						</div>
						<hr>
						<ul>
							<li><span><i class="fas fa-user"></i>  Name:</span> ${user.name}<li>
							<li><span><i class="fas fa-compass"></i>  Location:</span> ` + user.location + `<li>
							<li><span><i class="fas fa-calendar-alt"></i>  Joined at:</span> ${user.created_at}<li>
							<li><span><i class="fas fa-building"></i>  Company:</span> ${user.company}<li>
							<li><span><i class="fas fa-at"></i>  E-mail:</span> ${user.email}<li>
							<li><span><i class="fas fa-info-circle"></i>  Bio:</span> ${user.bio}<li>
						</ul>
					</div>
				`);
				console.log(user);
			});
		}
		
		else {
			$resultsPanel.hide()
			$errorPanel.hide();
		}
	});
});
