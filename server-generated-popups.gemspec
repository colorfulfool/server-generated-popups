# -*- encoding: utf-8 -*-

Gem::Specification.new do |gem|
  gem.authors       = ["Anton Khamets"]
  gem.email         = ["colorfulfool@gmail.com"]
  gem.summary       = %q{Show a popup with one line of code}
  gem.summary       = %q{Show a popup with one line of code. Perfect for format.js responses, and just in JS too.}
  gem.homepage      = "https://github.com/colorfulfool/rails-popup"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "server-generated-popups"
  gem.require_paths = ["lib"]
  gem.version       = "1.1.8"
end
