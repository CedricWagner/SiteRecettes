{{-- ===== --}}
{{-- HOOKS --}}
{{-- ===== --}}

{{-- By order of appearence --}}
{{-- Do not delete, keep them empty if unused --}}


{{-- local tasks --}}
@task('hook_local_tasks_before', ['on' => 'localhost'])
    echo "=> Start local tasks..."
@endtask

@task('hook_local_tasks_after', ['on' => 'localhost'])
    echo "<= End local tasks..."
@endtask

{{-- init --}}
@task('hook_init', ['on' => 'web'])
    echo "=> Start deployment..."
    cd {{ absPath($config, 'app_path') }}
    {{-- set maintenance mode --}}
    docker exec {{ $config['docker_container_name'] }} vendor/bin/drupal site:maintenance on
    {{-- dump database --}}
    @if ($dump)
        docker exec {{ $config['docker_container_name'] }} vendor/bin/drupal database:dump --file=/var/www/html/{{ $dump_name }}
    @endif
@endtask

{{-- git --}}
@task('hook_git_before', ['on' => 'web'])
    echo "==> Start git"
    echo "reset changes in .lock file"
    cd {{ absPath($config, 'app_path') }}
    git checkout -- ./react_app/package-lock.json
@endtask

@task('hook_git_after', ['on' => 'web'])
    echo "<= End git"
@endtask

{{-- composer --}}
@task('hook_composer_before', ['on' => 'web'])
    echo "=> Start composer"
    cd {{ absPath($config, 'app_path') }}
    docker exec {{ $config['docker_container_name'] }} composer install
@endtask

@task('hook_composer_after', ['on' => 'web'])
    echo "<= End composer"
@endtask

{{-- npm --}}
@task('hook_npm_before', ['on' => 'web'])
    echo "=> Start NPM"
    cd {{ absPath($config, 'npm_path') }}
    npm install
    npm run prod
@endtask
    
@task('hook_npm_after', ['on' => 'web'])
    echo "<= End NPM"
@endtask

{{-- complete --}}
@task('hook_complete', ['on' => 'web'])
    cd {{ absPath($config, 'app_path') }}
    {{-- import config --}}
    docker exec {{ $config['docker_container_name'] }} drush config:import --source={{ $config['docker_container_working_dir'] }}/config/sync -y
    {{-- unset maintenance mode --}}
    docker exec {{ $config['docker_container_name'] }} vendor/bin/drupal site:maintenance off
    {{-- reload caches --}}
    docker exec {{ $config['docker_container_name'] }} vendor/bin/drupal cr
    echo "<== Deployment completed successfully :)"
@endtask

